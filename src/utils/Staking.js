import { getStake, postStake, postUnStake } from "service/Stake";
import { connectWallet } from "./connectWallet";
import { NFTContract, StackingContract } from "./ContractGenerator";
import { approve, getApproved, getRarityId } from "./NFT";
import { allowance, approveToken } from "./Token";
import { Web3Provider } from "./Web3Provider";

const Config = JSON.parse(localStorage.getItem('Config'));
const StackingAddress = Config ? Config.StackingAddress : null;

export const Stake = async (data) => {
    try {

        await connectWallet();
        const isApproved = await getApproved(data.idToken,StackingAddress);
        let statusStake;

        if (isApproved) {
            statusStake = await processStake(data.idToken);
        }
        else {
            const approveHash = await approve(data.idToken,StackingAddress);
            statusStake = await asyncInterval(approveHash).then(async (e) => {
                const stakeStatus = await processStake(data.idToken);
                return stakeStatus;
            });
        }

        if (statusStake == true) {
            const dataStake = {
                "idToken": data.idToken,
                "monthlyRewards": data.monthlyRewards,
                "owner": window.ethereum.selectedAddress,
                "ref": data.ref
            }
            const status = await postStake({ data: dataStake });
            if (status.status == 200) {
                return { status: true, message: "Stake Successfully !!!!" };
            }
            else {
                return { status: false, message: "Error occurred when Stake !" };
            }
        }
        else {
            return { status: false, message: "Can't Stake !" };
        }
    }
    catch (e) {
        return e;
    }

}

export const Unstake = async (tokenId) => {
    try {
        await connectWallet();
        let unStakeStatus;
        const isApproved = await processApproveToken(StackingAddress, tokenId);
        if (isApproved == true) {
            unStakeStatus = await processUnStake(tokenId);
        }
        else {
            unStakeStatus = false;
        }
        if (unStakeStatus == true) {
            const status = await postUnStake(tokenId);
            if (status.status == 200) {
                return { status: true, message: "Unstack Successfully !!!!" };
            }
            else {
                return { status: false, message: "Error occurred when unstake !" };
            }
        }
        else {
            return { status: false, message: "Can't unstack" }
        }

        // const unstackFee = await getFee(tokenId);

        // let unStakeStatus;
        // if(isApproved < uns) { 
        //     unStakeStatus = await processUnStake(tokenId);

        // }
        // else { 
        //     const approveHash = await approve(amount,StackingAddress);
        //     unStakeStatus = await asyncInterval(approveHash).then(async (e) => {
        //         unStakeStatus = await processUnStake(tokenId);
        //         return unStakeStatus;
        //     });
        // }
        // if(unStakeStatus == true) { 
        //     const status= await postUnStake(tokenId);
        //     if(status.status == 200) { 
        //         return {status: true,message: "Unstack Successfully !!!!"};
        //     }
        //     else { 
        //         return {status: false,message: "Error occurred when unstake !"};
        //     }
        // }
        // else { 
        //     return {status: false ,message: "Can't unstack"}
        // }
    }
    catch (e) {
        return e;
    }
}

export const processApproveToken = async (sponsorAddress, tokenId) => {
    await connectWallet();
    const web3 = await Web3Provider();
    const allow = await allowance(sponsorAddress);
    const fee = await getFee(tokenId);
    if (allow < web3.utils.toWei(fee,'ether')) {
        const approveHash = await approveToken(fee, sponsorAddress);
        const status = await asyncInterval(approveHash).then(async (e) => {
            return e;
        });
        return status;
    }
    else {
        return true;
    }
}


export const processStake = async (tokenId) => {
    await connectWallet();
    const contractStaking = await StackingContract();
    var data = await contractStaking.methods['stake'](tokenId, "12").encodeABI();
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: contractStaking._address, // Required except during contract publications.
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


export const processUnStake = async (tokenId) => {

    await connectWallet();
    const contractStaking = await StackingContract();
    var data = await contractStaking.methods['unstake'](tokenId).encodeABI();
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: contractStaking._address, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
        data: data,
        chainId: window.ethereum.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    }
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });

    let unStakeStatus = await asyncInterval(txHash);
    return unStakeStatus;
}

export const getFee = async (tokenId) => {
    await connectWallet();
    const contractStacking = await StackingContract();
    const fee = await contractStacking.methods['getFee'](tokenId).call();
    return fee;
}



export const getRewardsByRarity = async (rarity) => {
    await connectWallet();
    const contractStaking = await StackingContract();
    let rewards = await contractStaking.methods['getRewardsByRarity'](rarity).call();
    return rewards;
}


export const asyncInterval = async (hash) => {
    await connectWallet();
    const web3 = await Web3Provider();
    const status = new Promise((resolve, reject) => {
        const interval = setInterval(async function () {
            await web3.eth.getTransactionReceipt(hash, async function (err, rec) {
                if (rec) {
                    if (rec.status === false) {
                        resolve(false);
                        clearInterval(interval);

                    }
                    else {
                        resolve(true);
                        clearInterval(interval);
                    }
                }
            })
        }, 1000);
    });
    return status;
}



function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year + ' ';
    return time;
}

export const getUserStakedNFT = async () => {
    await connectWallet();
    const web3 = await Web3Provider();
    const contractStaking = await StackingContract();
    const contractNFT = await NFTContract();
    const staked = await contractStaking.methods['getStakedTokens'](window.ethereum.selectedAddress).call();


    let stakedItem = [];

    for (let i = 0; i < staked.length; i++) {
        const tigerInfo = await contractNFT.methods['tigerInfo'](staked[i]).call();
        const stakedInfo = await contractStaking.methods['nftStaked'](staked[i]).call()
        const stakeServer = await getStake(16);
        const rateEarn = (stakeServer.data.availableEarn / stakeServer.data.monthlyRewards) * 100;
        const rarityId = await getRarityId(tigerInfo.rarity);
        const TUP = await contractStaking.methods['percentRewards'](rarityId).call();

        const info = {
            tokenId: stakedInfo.tokenId,
            rarity: tigerInfo.rarity,
            owner: tigerInfo.owner,
            uri: tigerInfo._uri,
            rewards: stakedInfo.rewards,
            startStake: await timeConverter(stakedInfo.startStake),
            rate: rateEarn.toFixed(3),
            availableEarn: stakeServer.data.availableEarn,
            TUP: TUP
        }

        stakedItem.push(info);
    }

    console.log('stakedITEMMMMMMMMMMM', stakedItem)
    return stakedItem;
}


