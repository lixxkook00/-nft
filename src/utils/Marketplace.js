import axios from "axios";
import { MarketplaceContract } from "./ContractGenerator";
import { getNFTInfo, getApproved, approve } from "./NFT";
import { connectWallet } from "./connectWallet";
import { Web3Provider } from "./Web3Provider";
import { asyncInterval } from "./Helper";
import { allowance, approveToken } from "./Token";

const Config = JSON.parse(localStorage.getItem('Config'));
const MarketplaceAddress = Config ? Config.MarketplaceAddress : null;
const MarketplaceABI = Config ? Config.MarketplaceABI : null;




export async function getMarketItem() {
    try {
        await connectWallet();
        const web3 = await Web3Provider();
        const contractMarketplace = await MarketplaceContract();
        const marketItem = await contractMarketplace.methods['getMarketItem']().call();
        console.log('marketItem', marketItem);
        let cardItem = [];

        const waiting = await marketItem.map(async (item) => {
            if (item['owner'] != '0x0000000000000000000000000000000000000000') {
                const priceOnMarket = await web3.utils.fromWei(item["price"], 'ether');
                console.log('priceOnMarket', priceOnMarket);
                const info = await getNFTInfo(item["tokenId"]);
                console.log('info', info)
                let data = {
                    idToken: item["tokenId"],
                    seller: item.seller,
                    rarity: info.rarity,
                    uri: info._uri,
                    price: priceOnMarket,
                    status: info.status
                }
                await cardItem.push({ data });
                return true
            }
        })
        const result = await Promise.all(waiting).then(values => {
            console.log('value', values);
            return (true);
        });
        if (result) {
            return cardItem;
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
}




async function checkAllowance(itemId) {
    await connectWallet();
    const web3 = await Web3Provider();
    const allow = await allowance(MarketplaceAddress);
    const price = await getPrice(itemId);
    if (allow < price) {
        const approveHash = await approveToken(web3.utils.fromWei(price, 'ether'), MarketplaceAddress);
        const status = await asyncInterval(approveHash).then(async (e) => {
            return e;
        });
        return status;
    }
    else {
        return true;
    }
}

export async function getPrice(itemId) {
    await connectWallet();
    const contractMarketplace = await MarketplaceContract();
    const data = await contractMarketplace.methods['getDetailSelling'](itemId).call();
    return data["price"];
}
export async function getItemId(tokenId) {
    await connectWallet();
    const contractMarketplace = await MarketplaceContract();
    const itemId = await contractMarketplace.methods['idTokenToItem'](tokenId).call();
    return itemId;

}

export async function buyNFT(data) {
    try {
        await connectWallet();
        const isApproved = await checkAllowance(data.idToken);
        let statusBuy;
        if (isApproved == true) {
            const itemId = await getItemId(data.idToken)
            statusBuy = await processBuy(itemId);
        }
        else {
            statusBuy = false;
        }
        if (statusBuy == true) {
            return { status: true, message: "Buy Successfully !!!!" };
        }
        else {
            return { status: false, message: "Can't buy" }
        }
    }
    catch (e) {
        return e;
    }
}

export async function processBuy(itemId) {
    await connectWallet();
    const contractMarketplace = await MarketplaceContract();
    const data = await contractMarketplace.methods['createMarketSale'](itemId).encodeABI();
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: contractMarketplace._address, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
        data: data,
        chainId: window.ethereum.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    let stakeStatus = await asyncInterval(txHash);
    return stakeStatus;
}


export async function sellNFT(tokenId, price) {
    try {
        console.log('tokenId,price', tokenId, price);
        await connectWallet();
        const isApproved = await getApproved(tokenId, MarketplaceAddress);
        console.log('isApprove', isApproved);
        let statusSell;
        if (isApproved == true) {
            statusSell = await processSell(tokenId, price);
        }
        else {
            const approveHash = await approve(tokenId, MarketplaceAddress);
            statusSell = await asyncInterval(approveHash).then(async (e) => {
                const sellStatus = await processSell(tokenId, price);
                return sellStatus;
            });
        }
        if (statusSell == true) {
            return { status: true, message: "Sell Successfully !!!!" };
        }
        else {
            return { status: false, message: "Can't sell" }
        }
    }
    catch (e) {
        return e;
    }

}


export async function processSell(tokenId, price) {
    console.log('process')
    await connectWallet();
    const contractMarketplace = await MarketplaceContract();
    const web3 = await Web3Provider();
    console.log('true price', web3.utils.toWei(price, 'ether'));
    const data = await contractMarketplace.methods['createMarketItem'](tokenId, web3.utils.toWei(price, 'ether')).encodeABI();
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: contractMarketplace._address, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
        data: data,
        chainId: window.ethereum.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    let sellStatus = await asyncInterval(txHash);
    return sellStatus;
}


export async function getSellingList() {
    try {
        await connectWallet();
        const web3 = await Web3Provider();
        const contractMarketplace = await MarketplaceContract();
        const itemSelling = await contractMarketplace.methods['getSellingToken'](window.ethereum.selectedAddress).call();
        console.log('marketItem', itemSelling);
        let cardItem = [];

        const waiting = await itemSelling.map(async (id) => {
            const detailSelling = await contractMarketplace.methods['getDetailSelling'](id).call();
            console.log('details Selling', detailSelling);
            const info = await getNFTInfo(id);
            console.log('info', info)
            let data = {
                idToken: id,
                seller: detailSelling["seller"],
                rarity: info.rarity,
                uri: info._uri,
                price: await web3.utils.fromWei(detailSelling["price"], 'ether'),
                status: info.status
            }
            await cardItem.push({ data });
            return true
        })
        const result = await Promise.all(waiting).then(values => {
            console.log('value', values);
            return (true);
        });
        if (result) {
            return cardItem;
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
}


export async function delistItem(tokenId) {
    try {
        await connectWallet();
        let statusSell = await processDelist(tokenId);
        if (statusSell == true) {
            return { status: true, message: "Sell Successfully !!!!" };
        }
        else {
            return { status: false, message: "Can't sell" }
        }
    }
    catch (e) {
        return e;
    }

}

export async function processDelist(tokenId) {
    console.log('process')
    await connectWallet();
    const contractMarketplace = await MarketplaceContract();
    const itemId = await contractMarketplace.methods['idTokenToItem'](tokenId).call();
    const data = await contractMarketplace.methods['delistItem'](itemId).encodeABI();
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: contractMarketplace._address, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
        data: data,
        chainId: window.ethereum.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    let delistStatus = await asyncInterval(txHash);
    return delistStatus;
}