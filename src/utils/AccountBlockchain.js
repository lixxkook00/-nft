import {SQFContract,BUSDContract,FactoryContract,MarketplaceContract,NFTContract,preSaleContract } from "./ContractGenerator";
import  { Web3Provider } from "./Web3Provider";
import Web3 from "web3";



// Call config and set to local variable;

const Config = JSON.parse(localStorage.getItem('Config'));
const preSaleContractAddress = Config ? Config.preSaleContractAddress : null;
const preSaleContractABI = Config ? Config.preSaleContractABI : null;
const SQFSmartContractABI = Config ? Config.SQFSmartContractABI : null;
const SQFSmartContractAddress = Config ? Config.SQFSmartContractAddress : null;
const BUSDSmartContractAddress = Config ? Config.BUSDSmartContractAddress : null;
const BUSDSmartContractABI = Config ? Config.BUSDSmartContractABI : null;
const NFTSmartContractAddress = Config ? Config.NFTSmartContractAddress : null;
const NFTSmartContractABI = Config ? Config.NFTSmartContractABI : null;
const FactorySmartContractAddress = Config ? Config.FactorySmartContractAddress : null;
const FactorySmartContractABI = Config ? Config.FactorySmartContractABI : null;
const MarketplaceSmartContractAddress = Config ? Config.BUSDSmartContractAddress : null;
const MarketplaceSmartContractABI = Config ? Config.BUSDSmartContractABI : null;
const rpcUrl = Config ? Config.rpcUrl : null;
const web3 = Config ? new Web3(rpcUrl) : null;


// Call constructor contract and set to local variable;




export const Approve = async ( addressToApprove, values)  => { 
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const chainId = await this.web3.eth.getChainId();
                const decimals = await this.contractSQF.methods['decimals']().call();
                const value = Number(values) + Number(1);
                const BN = this.web3.utils.BN;
                const tokenDecimals = new BN(Number(decimals));
                const tokenAmountToApprove = new BN(value);
                const calculatedApproveValue = new BN(tokenAmountToApprove.mul(new BN(10).pow(tokenDecimals)));
            
                var data = this.contractSQF.methods['approve'](addressToApprove, calculatedApproveValue).encodeABI();
                const transactionParameters = {
                    nonce: '0x00', // ignored by MetaMask
                    // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                    // gas: '0x2710', // customizable by user during MetaMask confirmation.
                    to: SQFSmartContractAddress, // Required except during contract publications.
                    from: window.ethereum.selectedAddress, // must match user's active address.
                    // value: this.web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
                    data: data,
                    chainId: this.web3.utils.toHex(chainId), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                };
                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
                return txHash;
            }
            catch (err) {
                return { code: 500, Error: err }
            }
}

export const activeAccount = async (typeAccount,values) => { 
        try { 
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const contractFactory = await FactoryContract();
            // const activePrice = await contractFactory.methods[""];
            // const value = web3.utils.toWei(values,ether);
            await Approve(FactorySmartContractAddress,values);
            const chainId = await web3.eth.getChainId();
            // console.log('window ethereum address', window.ethereum.selectedAddress)
            const data = await contractFactory.methods["activeAccount"](typeAccount).encodeABI();
            const transactionParameters = {
                nonce: '0x00', // ignored by MetaMask
                // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                // gas: '0x2710', // customizable by user during MetaMask confirmation.
                to: FactorySmartContractAddress, // Required except during contract publications.
                from: window.ethereum.selectedAddress, // must match user's active address.
                // value: this.web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
                data: data,
                chainId: web3.utils.toHex(chainId), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            return txHash;

        }
        catch (err) { 
            console.error(err);
            alert(new Error(err));
        }
}

        
// class AccountBlockchain { 


//     constructor() { 
//         window.ethereum.request({ method: 'eth_requestAccounts' })
//         // this.contractSQF = SQFContract();
//         // this.contractNFT = NFTContract();
//         // this.contractBUSD = BUSDContract();
//         // this.contractFactory = FactoryContract();
//         // this.contractMarketplace = MarketplaceContract();
//         // this.web3 = Web3Provider();
//     }

//     static web3 = Web3Provider();
//     static contractSQF = SQFContract();
//     static contractNFT = NFTContract();
//     static contractBUSD = BUSDContract();
//     static contractFactory = FactoryContract();
//     static contractMarketplace = MarketplaceContract();


//     static Approve = async ( addressToApprove, values)  => { 
//         try {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const chainId = await this.web3.eth.getChainId();
//             const decimals = await this.contractSQF.methods['decimals']().call();
//             const value = Number(values) + Number(1);
//             const BN = this.web3.utils.BN;
//             const tokenDecimals = new BN(Number(decimals));
//             const tokenAmountToApprove = new BN(value);
//             const calculatedApproveValue = new BN(tokenAmountToApprove.mul(new BN(10).pow(tokenDecimals)));
        
//             var data = this.contractSQF.methods['approve'](addressToApprove, calculatedApproveValue).encodeABI();
//             const transactionParameters = {
//                 nonce: '0x00', // ignored by MetaMask
//                 // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//                 // gas: '0x2710', // customizable by user during MetaMask confirmation.
//                 to: SQFSmartContractAddress, // Required except during contract publications.
//                 from: window.ethereum.selectedAddress, // must match user's active address.
//                 // value: this.web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
//                 data: data,
//                 chainId: this.web3.utils.toHex(chainId), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//             };
//             const txHash = await window.ethereum.request({
//                 method: 'eth_sendTransaction',
//                 params: [transactionParameters],
//             });
//             return txHash;
//         }
//         catch (err) {
//             return { code: 500, Error: err }
//         }
//     }
//     // async Approve(addressToApprove, values) { 
//     //     try {
//     //         const chainId = await this.web3.eth.getChainId();
//     //         const decimals = await this.contractSQF.methods['decimals']().call();
//     //         const value = Number(values) + Number(1);
//     //         const BN = this.web3.utils.BN;
//     //         const tokenDecimals = new BN(Number(decimals));
//     //         const tokenAmountToApprove = new BN(value);
//     //         const calculatedApproveValue = new BN(tokenAmountToApprove.mul(new BN(10).pow(tokenDecimals)));
//     //         const contractBUSD = await BUSDContract();
        
//     //         var data = this.contractSQF.methods['approve'](addressToApprove, calculatedApproveValue).encodeABI();
//     //         const transactionParameters = {
//     //             nonce: '0x00', // ignored by MetaMask
//     //             // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     //             // gas: '0x2710', // customizable by user during MetaMask confirmation.
//     //             to: SQFSmartContractAddress, // Required except during contract publications.
//     //             from: window.ethereum.selectedAddress, // must match user's active address.
//     //             // value: this.web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
//     //             data: data,
//     //             chainId: this.web3.utils.toHex(chainId), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//     //         };
//     //         const txHash = await window.ethereum.request({
//     //             method: 'eth_sendTransaction',
//     //             params: [transactionParameters],
//     //         });
//     //         return txHash;
//     //     }
//     //     catch (err) {
//     //         return { code: 500, Error: err }
//     //     }

//     // }


//     static activeAccount = async (typeAccount) => { 
//         try { 
//             window.ethereum.request({ method: 'eth_requestAccounts' });
//             const data = this.contractFactory.methods['activeAccount'](typeAccount).send({from : window.ethereum.selectedAddress });
//             return data;

//         }
//         catch (err) { 
//             console.error(err);
//             alert(new Error(err));
//         }
//     }

//     // async activeAccount(typeAccount) { 
//     //     try { 
//     //         const data = this.contractFactory.methods['activeAccount'](typeAccount).send({from : window.ethereum.selectedAddress });
//     //         return data;

//     //     }
//     //     catch (err) { 
//     //         console.error(err);
//     //         alert(new Error(err));
//     //     }

//     // }
    






// }


// export default AccountBlockchain;