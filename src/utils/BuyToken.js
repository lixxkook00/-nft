import { toast } from "react-toastify";
import axios from "axios";
import { approve } from "./Wallet";
import { Load, unLoad } from "./Loader";
import Web3 from "web3";
import i18next from "i18next";


const Config = JSON.parse(localStorage.getItem('Config'));
const preSaleContractAddress = Config ? Config.preSaleContractAddress : null;
const preSaleContractABI = Config ? Config.preSaleContractABI : null;
const SQFSmartContractABI = Config ? Config.SQFSmartContractABI : null;
const SQFSmartContractAddress = Config ? Config.SQFSmartContractAddress : null;
const BUSDSmartContractAddress = Config ? Config.BUSDSmartContractAddress : null;
const BUSDSmartContractABI = Config ? Config.BUSDSmartContractABI : null;
const rpcUrl = Config ? Config.rpcUrl : null;
const web3 = Config ? new Web3(rpcUrl) : null;


export async function preSaleContract() {
    const contractPreSale = new web3.eth.Contract(
        JSON.parse(preSaleContractABI),
        preSaleContractAddress,
        {}
    );
    return contractPreSale;
}

export async function SQFContract() {
    const contractSQF = await new web3.eth.Contract(
        JSON.parse(SQFSmartContractABI),
        SQFSmartContractAddress,
        {}
    );
    return contractSQF;
}

export async function BUSDContract() {
    const contractBUSD = await new web3.eth.Contract(
        JSON.parse(BUSDSmartContractABI),
        BUSDSmartContractAddress,
        {}
    );
    return contractBUSD;
}


export async function checkValid() {
    const contractPreSale = await preSaleContract();
    const sold = await contractPreSale.methods['_saledToken']().call();
    const total = await contractPreSale.methods['_maxTokenSale']().call();
    const availToken = await ( web3.utils.fromWei(total, 'ether') - web3.utils.fromWei(sold,'ether') );
    console.log('testttttttttttttttttttt',availToken);
    return availToken;
}

export async function BuyToken(values) {
    Load()
    try {
        const availToken = await checkValid();
        if ( values > availToken  ){ 
            alert(`Token sold out, Available Token selling left : ${availToken}`);
        }
        else {

            const approveHash = await approve(values);
            const interval = setInterval(async function () {
                try {
                    await web3.eth.getTransactionReceipt(approveHash, async function (err, rec) {
                        if (rec) {
                            clearInterval(interval);
                            if (rec.status === false) {
                                toast('Approve fail');
                            }
                            else {
                                toast('Approve successfully');
                                const contractPreSale = await preSaleContract();
                                const value = Number(values)
                                const BN = await web3.utils.BN;
                                const tokens = await web3.utils.toWei(value.toString())
                                const number = new BN(tokens);
                                // const gas = await getGasPrice();

                                // console.log(window.ethereum.selectedAddress);


                                var data = await contractPreSale.methods['buyByBUSD'](window.localStorage.getItem("refCode") || '0x0000000000000000000000000000000000000000', web3.utils.toHex(number)).encodeABI();
                                const transactionParameters = {
                                    nonce: '0x00', // ignored by MetaMask
                                    // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                                    // gas: gas, // customizable by user during MetaMask confirmation.
                                    to: preSaleContractAddress, // Required except during contract publications.
                                    from: window.ethereum.selectedAddress, // must match user's active address.
                                    // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
                                    data: data,
                                    chainId: web3.utils.toHex(56), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                                };
                                const txHash = await window.ethereum.request({
                                    method: 'eth_sendTransaction',
                                    params: [transactionParameters],
                                })
                                    .then(async (res) => {
                                        // unLoad();
                                        await postBuyToken(window.ethereum.selectedAddress, SQFSmartContractAddress, res, value);
                                    })
                                    .catch(function (e) {
                                        alert(`${i18next.t('_rejected_tx')}`);
                                        unLoad();
                                    });
                                return txHash;
                            }
                        }
                    })
                }
                catch (e) {
                    alert("Error :", e);
                }
            }, 1000);
        }

    }
    catch (error) {
        alert(error);
    }
    // else if(this.props.connectedWallet.connector && this.props.connectedWallet.connector.chainId === 56) {
    //     toast('Sending request !')
    //     var data = this.state.contractPreSale.methods['buy_PreSale']('0x0000000000000000000000000000000000000000').encodeABI();
    //     console.log('data buy_PreSale', data);
    //     const transactionParameters = {
    //         nonce: '0x00', // ignored by MetaMask
    //         // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    //         // gas: '0x2710', // customizable by user during MetaMask confirmation.
    //         to: this.state.preSaleContractAddress, // Required except during contract publications.
    //         from: this.props.connectedWallet.address, // must match user's active address.
    //         value: web3.utils.toHex(this.refs.amount.value * 10 ** 18), // Only required to send ether to the recipient from the initiating external account.
    //         data: data,
    //         chainId: this.props.connectedWallet.chainId// Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    //     };
    //     console.log('transactionParameters ', transactionParameters);
    //     console.log('aaaa',this.props.connectedWallet.connector.sendTransaction(transactionParameters));
    //     const txHash = await this.props.connectedWallet.connector.sendTransaction(transactionParameters)
    //                         .then((result) => { 
    //                             toast('Buy successfully !!!')
    //                             console.log('result send ne',result)
    //                             return result;
    //                         })
    //     // console.log(this.props.connectedWallet.connector.sendTransaction(transactionParameters));
    //     console.log('txHash ', txHash);
    // }

}



async function postBuyToken(from, to, hash, amount) {
    toast(`${i18next.t('_waiting_tx')}`);
    const interval = setInterval(function () {
        try {
            web3.eth.getTransactionReceipt(hash, async function (err, rec) {
                if (rec) {
                    clearInterval(interval);
                    if (rec.status === false) {
                        alert(`${i18next.t('_tx_fail')}`);
                        unLoad()
                    }
                    else {
                        alert(`${i18next.t('_success')}`);
                        unLoad()
                        // const formData = new FormData()
                        // formData.append("walletfrom", from);
                        // formData.append("walletto", to);
                        // formData.append("hash", hash);
                        // formData.append("amount", amount);
                        // formData.append("type", 2);
                        // formData.append("hashParent", "");
                        // await axios.post('https://api.metawar.biz/BlockChain/CreateTrans', formData).then((res) => {
                        //     if (res.data.code === 200) {
                        //         // alert('Buy Token Successfully');
                        //         toast(`${i18next.t(`_pending`)}`);
                        //         unLoad();
                        //     }
                        // })
                    }
                }
            })
        }
        catch (e) {
            alert("Error :", e);
        }

    }, 1000);
}


async function postSendToken(from, to, hash, amount, id) {
    const formData = new FormData();
    formData.append("walletfrom", from);
    formData.append("walletto", to);
    formData.append("hash", hash);
    formData.append("amount", amount);
    formData.append("type", 1);
    formData.append("id", id);
    await axios.post('https://api.metawar.biz/BlockChain/UpdateTrans', formData)
        .then(res => {
            console.log(res);
        })
}


// export async function BuyTokenDemo(values) {
//     Load();
//     const value = values;
//     console.log(window.ethereum.chainId);
//     if (window.ethereum && window.ethereum.chainId === '0x61') {
//         const abcd = await SQFContract()
//             .then(async () => {
//                 const BN = web3.utils.BN;
//                 const tokens = web3.utils.toWei(value);
//                 const number = new BN(tokens);
//                 // console.log('number',value);
//                 try {
//                     await web3.eth.sendTransaction({
//                         to: "0xAa05f0f0c7Ee13611776d748A5944F31F1450e50",
//                         from: window.ethereum.selectedAddress,
//                         value: web3.utils.toHex(number),
//                         chainId: web3.utils.toHex(97),
//                     })
//                         .on('transactionHash', function (hash) {
//                             // console.log('HASH', hash);
//                         })
//                         .on('receipt', function (receipt) {
//                             toast('Waiting for confirm !');
//                             console.log('receipt', receipt)
//                             postBuyToken(window.ethereum.selectedAddress, "0xAa05f0f0c7Ee13611776d748A5944F31F1450e50", receipt.transactionHash, value)
//                                 .then(res => {
//                                     reSend(receipt, res.data.transid);
//                                 })
//                         })
//                         .on('error', console.error);
//                 }
//                 catch {
//                     unLoad();
//                 }
//             })

//         return abcd;

//     }
//     else {
//         alert('Please select Mainnet to Buy SQF !!');
//         unLoad();
//         // window.location.reload();
//     }
// }



// export async function reSend(hash, transId) {
//     console.log(txR);
//     web3.eth.getTransaction(txR.transactionHash, async function (err, result) {
//         if (result.value) {
//             const value = web3.utils.fromWei(result.value) * 25000000;
//             console.log("item ne", value)
//             const BN = web3.utils.BN;
//             const tokens = web3.utils.toWei(value.toString())
//             const number = new BN(tokens);
//             console.log(number.toString());
//             await SQFContract()
//                 .then(async (result) => {
//                     let contract = result;
//                     const data = await contract.methods['transfer'](txR.from, number.toString()).encodeABI();
//                     const transactionParameters = {
//                         // nonce: '0x00', // ignored by MetaMask?
//                         // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//                         // gas: '0x2710', // customizable by user during MetaMask confirmation.
//                         to: SQFSmartContractAddress, // Required except during contract publications.
//                         from: "0xAa05f0f0c7Ee13611776d748A5944F31F1450e50", // must match user's active address. 
//                         // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
//                         data: data,
//                         chainId: 97, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//                     };
//                     console.log('transactionParameters', transactionParameters);
//                     const gas = await web3.eth.getGasPrice();
//                     await web3.eth.accounts.signTransaction({
//                         gasPrice: gas,
//                         gas: 2000000,
//                         to: SQFSmartContractAddress, // Required except during contract publications.
//                         from: "0xAa05f0f0c7Ee13611776d748A5944F31F1450e50", // must match user's active address. 
//                         data: data,
//                         chainId: 97, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//                     }, '3b056426520ebe98fea533a597df22e9b0388e3eab875f0402c1d2756885773f')
//                         .then(res => {
//                             // res.rawTransaction
//                             // console.log(res.rawTransaction);
//                             web3.eth.sendSignedTransaction(res.rawTransaction)
//                                 .on('transactionHash', function (hash) {
//                                     postSendToken("0xAa05f0f0c7Ee13611776d748A5944F31F1450e50", txR.from, hash, value, transId).then(res => {
//                                         alert('Buy Successfully!!!');
//                                         unLoad();
//                                     })
//                                 })
//                         })
//                 })
//         }
//     });
// }