import { toast } from "react-toastify";
import axios from "axios";
import { Load, unLoad } from "./Loader";
import Web3 from "web3";
import i18next from "i18next";

import { TokenContract , BUSDContract } from '../utils/ContractGenerator'
import { connectWallet } from "./connectWallet";

// const rpcUrl = Config ? Config.rpcUrl : null;
// const web3 = Config ? new Web3(rpcUrl) : null;

const Config = JSON.parse(localStorage.getItem('Config'));

export async function getBalance() {
    await connectWallet();

    if (window.ethereum && window.ethereum.selectedAddress) {
        const token = await TokenContract()

        var balance = await token.methods['balanceOf'](window.ethereum.selectedAddress).call();
        // var balance = await TokenContract()

        const result = await Web3.utils.fromWei(balance.toString(), 'ether');

        return Number(result).toFixed(3);
    }
}

export async function getBalanceBUSD() {
    await connectWallet();

    if (window.ethereum && window.ethereum.selectedAddress) {
        const token = await BUSDContract();

        var balance = await token.methods['balanceOf'](window.ethereum.selectedAddress).call();

        const result = await Web3.utils.fromWei(balance.toString(), 'ether');

        return Number(result).toFixed(3);
    }
}

// export async function getPrice() {
//     const contractPreSale = await preSaleContract();
//     const price = await contractPreSale.methods._tokenPrice().call();
//     const BN = await web3.utils.BN;
//     const priceBN = new BN(price).toString();
//     const priceCalculator = await web3.utils.fromWei(priceBN, 'ether');
//     return priceCalculator;
// }

// export async function approve(values) {
//     const value = Number(values) + Number(1);
//     const BN = web3.utils.BN;
//     const tokenDecimals = new BN(18);
//     const tokenAmountToApprove = new BN(value);
//     const calculatedApproveValue = new BN(tokenAmountToApprove.mul(new BN(10).pow(tokenDecimals)));
//     const contractBUSD = await BUSDContract();

//     var data = contractBUSD.methods['approve'](preSaleContractAddress, calculatedApproveValue).encodeABI();
//     const transactionParameters = {
//         nonce: '0x00', // ignored by MetaMask
//         // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//         // gas: '0x2710', // customizable by user during MetaMask confirmation.
//         to: BUSDSmartContractAddress, // Required except during contract publications.
//         from: window.ethereum.selectedAddress, // must match user's active address.
//         // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
//         data: data,
//         chainId: web3.utils.toHex(56), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//     };
//     const txHash = await window.ethereum.request({
//         method: 'eth_sendTransaction',
//         params: [transactionParameters],
//     });
//     return txHash;
// }


// export async function getBuyedToken() { 
//     const contractPreSale = await preSaleContract();
//     var buyedToken = await contractPreSale.methods['buyedToken'](window.ethereum.selectedAddress).call();
//     var buyed = await web3.utils.fromWei(buyedToken, 'ether');
//     return buyed;
// }

// export async function getUnlockPercent() {
//     const contractPreSale = await preSaleContract();
//     var unlockPercent = await contractPreSale.methods['checkTimeUnlockPercent']().call();
//     var claimedPercent = await contractPreSale.methods['claimedPercent'](window.ethereum.selectedAddress).call();
//     return { unlockPercent, claimedPercent };
// }

// export async function claimToken() {
//     Load()
//     if (window.ethereum && window.ethereum.selectedAddress) {
//         const contractPreSale = await preSaleContract();
//         // var claim = await contractPreSale.methods['unlockToken']().send({ from: window.ethereum.selectedAddress });
//         var data = await contractPreSale.methods['unlockToken']().encodeABI();
//         const transactionParameters = {
//             nonce: '0x00', // ignored by MetaMask
//             // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//             // gas: gas, // customizable by user during MetaMask confirmation.
//             to: preSaleContractAddress, // Required except during contract publications.
//             from: window.ethereum.selectedAddress, // must match user's active address.
//             // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
//             data: data,
//             chainId: web3.utils.toHex(56), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//         };
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         }).then(async res => { 
//              await waitClaim(res);
//         });
//         return txHash;
//     }

// }

// export async function waitTx(hash) {
//     toast(`${i18next.t('_waiting_tx')}`);
//     let status;
//     const interval =await setInterval(function () {
//         try {
//             web3.eth.getTransactionReceipt(hash, async function (err, rec) {
//                 if (rec) {
//                     clearInterval(interval);
//                     if (rec.status === false) {
//                         alert(`${i18next.t('_tx_fail')}`);
//                         unLoad();
//                         return status = false;
//                     }
//                     else {
//                         alert(`${i18next.t('_success')}`);
//                         unLoad()     
//                         return status = true;               
//                     }
//                 }
//             })
//         }
//         catch (e) {
//             alert("Error :", e);
//         }
//     }, 1000);
//     return status;
// }

// export async function waitClaim(hash) {
//     toast(`${i18next.t('_waiting_tx')}`);
//     const interval = setInterval(function () {
//         try {
//             web3.eth.getTransactionReceipt(hash, async function (err, rec) {
//                 if (rec) {
//                     clearInterval(interval);
//                     if (rec.status === false) {
//                         alert(`${i18next.t('_claim_fail')}`);
//                         // unLoad()
//                         window.location.href = "/account"
//                         // return false;
//                     }
//                     else {
//                         alert(`${i18next.t('_claim_successfully')}`);
//                         window.location.href = "/account"
//                         // unLoad()                    
//                         // return true;
//                     }
//                 }
//             })
//         }
//         catch (e) {
//             alert("Error :", e);
//         }
//     }, 1000);
// }


// const preSaleContractAddress = Config ? Config.preSaleContractAddress : null;
// const preSaleContractABI = Config ? Config.preSaleContractABI : null;
// const SQFSmartContractABI = Config ? Config.SQFSmartContractABI : null;
// const SQFSmartContractAddress = Config ? Config.SQFSmartContractAddress : null;
// const BUSDSmartContractAddress = Config ? Config.BUSDSmartContractAddress : null;
// const BUSDSmartContractABI = Config ? Config.BUSDSmartContractABI : null;



// export async function preSaleContract() {
//     const contractPreSale = new web3.eth.Contract(
//         JSON.parse(preSaleContractABI),
//         preSaleContractAddress,
//         {}
//     );
//     return contractPreSale;
// }

// export async function SQFContract() {
//     const contractSQF = await new web3.eth.Contract(
//         JSON.parse(SQFSmartContractABI),
//         SQFSmartContractAddress,
//         {}
//     );
//     return contractSQF;
// }

// export async function BUSDContract() {
//     const contractBUSD = await new web3.eth.Contract(
//         JSON.parse(BUSDSmartContractABI),
//         BUSDSmartContractAddress,
//         {}
//     );
//     return contractBUSD;
// }


