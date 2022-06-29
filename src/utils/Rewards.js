import { claimCommission } from "service/Reward";
import { allPartner,getUser } from "service/User";
import { connectWallet } from "./connectWallet"
import { PaybackContract } from "./ContractGenerator";
import { Web3Provider } from "./Web3Provider";

const Config = JSON.parse(localStorage.getItem('Config'));




const payBackAddress = Config ? Config.payBackAddress : null;
const payBackABI = Config ? Config.payBackABI : null;

export const getRewardInfo = async () =>{ 
    await connectWallet();
    const partner = await allPartner(window.ethereum.selectedAddress);
    console.log('partner',partner.data);
    const userInfo = await getUser(window.ethereum.selectedAddress);
    console.log('userInfo',userInfo)
    const rewardInfo = { 
        partner : partner.data,
        level: userInfo.data.level,
        directCommission: userInfo.data.totalCommission,
        rewardByLevel: userInfo.data.totalRewardByLevel,
        rewardByStack: userInfo.data.totalRewardByStack
    }
    return rewardInfo;

}

const totalReward = async() => { 
    await connectWallet();
    const userInfo = await getUser(window.ethereum.selectedAddress);
    return userInfo.data.totalCommission;
}

const asyncInterval = async (hash) => {
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



export const claim = async () => { 
    try { 
        await connectWallet();
        const web3 = await Web3Provider();
        const contractPayback = await PaybackContract();
        const amount = await totalReward();
        const value = Number(amount)
        const BN = await web3.utils.BN;
        const tokens = await web3.utils.toWei(value.toString(),'ether')
        const number = new BN(tokens);
    
        const data = await contractPayback.methods["claim"](number).encodeABI();
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            // gas: gas, // customizable by user during MetaMask confirmation.
            to: payBackAddress, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
            data: data,
            chainId: window.ethereum.chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        })
        let claimStatus = await asyncInterval(txHash);
        if(claimStatus == true) { 
            const status =await claimCommission(window.ethereum.selectedAddress);
            console.log('status',status);
            return {message: 'Claimed Successfully'};
        }
        else { 
            return { message: 'Claimed Fails'};
        }

        
    }
    catch(e) { 
        return e;
    }
    


}
