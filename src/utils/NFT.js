import {NFTContract} from './ContractGenerator'
import { connectWallet } from './connectWallet';
import { Web3Provider } from './Web3Provider';


const Config = JSON.parse(localStorage.getItem('Config'));
const NFTAddress = Config ? Config.NFTAddress : null;
const StackingAddress = Config ? Config.StackingAddress : null;



export async function getApproved(tokenId,address) { 
        await connectWallet();
        const contractNFT = await NFTContract();
        const approvedAddress = await contractNFT.methods['getApproved'](tokenId).call();
        if(approvedAddress === address) { 
            return true;
        }
        else { 
            return false;
        }
}

export async function approve(tokenId,address) {
    await connectWallet();
    console.log(window.ethereum.chainId);
    const contractNFT = await NFTContract();
    var data = contractNFT.methods['approve'](address, tokenId).encodeABI();
    console.log(data);
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: NFTAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
        data: data,
        chainId: window.ethereum.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    return txHash;
}


export async function getOwnNFT() { 
    try { 
        await connectWallet();
        const contractNFT = await NFTContract();

        const totalNFT = await contractNFT.methods['balanceOf'](window.ethereum.selectedAddress).call();
        let cardId = [];
        for(let i = 0; i < totalNFT ; i ++ ) { 
            let id= await contractNFT.methods['tokenOfOwnerByIndex'](window.ethereum.selectedAddress,i).call();
            await cardId.push(id);
        }

        let cardItem = []; 
    
        const waiting =await cardId.map(async(id) => { 
            let info = await getNFTInfo(id);
            let data = { 
                idToken : id,
                owner : info.owner,
                rarity : info.rarity,
                uri : info._uri,
                status: info.status 
            }
            await cardItem.push({data});
            return true
        })
        const result =await Promise.all(waiting).then(values => {
            return(true);
        });
        if(result) { 
            return cardItem;
        }
        else { 
            return null;
        }
    }
    catch(e) { 
        return null;
    }


}


export async function getSellingNFT() { 
    try { 
        await connectWallet();
    }
    catch(e) { 
        return null;
    }

}


export async function getNFTInfo(tokenId) { 
    await connectWallet();
    const contractNFT = await NFTContract();
    const tigerInfo = await contractNFT.methods['tigerInfo'](tokenId).call();
    let tiger = { 
        owner: tigerInfo.owner,
        _uri: tigerInfo._uri,
        rarity: tigerInfo.rarity,
        status: tigerInfo.status
    }
    return tiger;

}


export const getRarityId = async (rarityString) => {
    if (rarityString == "Common") {
      return 0;
    }
    if (rarityString == "Rare") {
      return 1;
    }
    if (rarityString == "Supper Rare") {
      return 2;
    }
  }

