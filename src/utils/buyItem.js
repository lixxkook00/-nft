import { toast } from "react-toastify";
import axios from "axios";
import { Load, unLoad } from "./Loader";
import Web3 from "web3";
import i18next from "i18next";

const Config = JSON.parse(localStorage.getItem('Config'));
const SQFSmartContractABI =Config ? Config.SQFSmartContractABI : null;
const SQFSmartContractAddress =Config ? Config.SQFSmartContractAddress : null;
const web3 =Config ? new Web3(Config.rpcUrl) : null;

export async function SQFContract() {


  const contractSQF = await new web3.eth.Contract(
    JSON.parse(SQFSmartContractABI),
    SQFSmartContractAddress,
    {}
  );
  // console.log('contract neeeeeeeeeeeeeeeeeeee',contractSQF);

  return contractSQF;
}

export async function send(txHash) {
  // console.log('hash ne',txHash);
  if (txHash) {
    const tx = await window.ethereum.request({
      method: 'eth_getTransactionReceipt',
      params: [txHash],
    }, function (err, res) {
      console.log(res);
      if (err) {
        console.log("An error occured", err)
        return
      }
      if (res) {
        console.log("Hash of the transaction: " + res)
      }
      else {
        console.log("cancel");
      }
    })
      .catch(function (e) {
        alert(`${i18next.t('_rejected_tx')}`);
        unLoad();
      });

    if (tx) {
      return tx;
    }

  }

  // return "hahahaha";
}


export async function sendHash(item, txHash) {
  toast(`${i18next.t('_waiting_tx')}`);
  const interval = setInterval(function () {
      try { 
          web3.eth.getTransactionReceipt(txHash, async function (err, rec) {
              if (rec) {
                  clearInterval(interval);
                  if (rec.status === false) {
                      alert(`${i18next.t('_tx_fail')}`);
                      unLoad()
                  }
                  else {
                    const formData = new FormData();
                    formData.append("itemInput",item.packageId)
                    formData.append("type",2)
                    formData.append("hashCode", txHash);
                    formData.append("wallet", window.ethereum.selectedAddress);
                    axios
                      .post("https://api.metawar.biz/MarketPlace/BuyItemOrder", formData)
                      .then(async (res) => {
                        if (res.data.message) {
                          alert(`${i18next.t('_success')}`);
                          window.location.href = `/all-item`;
                          unLoad()
                        }
                      })
                  }
              }
          })
      }
      catch (e) { 
          alert("Error :",e);
      }
      
  }, 1000);


}

export async function handleBuyItem(item) {

  const formData = new FormData();
  formData.append("itemInput",item.packageId);
  formData.append("type",2)
  await axios
    .post("https://api.metawar.biz/MarketPlace/BuyItemHashOrder", formData)
    .then(async (res) => {

      const x = await buyItem(res);
      if (x) {
        toast(`${i18next.t('_pending')}`);
        sendHash(item, x);
      }
    })



} 




export async function buyItem(item) {
  const BN = web3.utils.BN;
  const tokens = web3.utils.toWei(item.data.code.toString())
  const number = new BN(tokens);
  const tx = await SQFContract()
    .then(async (result) => {
      let contract = result;
      // console.log(window.ethereum.selectedAddress);
      const data = contract.methods['transfer'](item.data.key, number.toString()).encodeABI();
      const transactionParameters = {
        // nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: SQFSmartContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address. 
        // value: web3.utils.toHex(number), // Only required to send ether to the recipient from the initiating external account.
        data: data,
        chainId: 97, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      }, function (err, res) {
        // console.log(res);
        if (err) {
          console.log("An error occured", err)
          return
        }
        if (res) {
          console.log("Hash of the transaction: " + res)
        }
        else {
          console.log("cancel");
        }
      })
        .catch(function (e) {
          alert(`${i18next.t('_rejected_tx')}`);
          unLoad();
        });
      // console.log('hash',txHash);
      if (txHash) {
        return txHash;
      }
    })
  return tx;
}

export async function BalanceOf() {
  const balance = await SQFContract()
    .then(async (result) => {
      let contract = result;
      console.log('contract',contract)
      var balance = await contract.methods['balanceOf'](window.ethereum.selectedAddress).call();
      const BN = web3.utils.BN;
      const balanceBN = new BN(balance);
      const decimalsBN = new BN(18);
      const divisor = new BN(10).pow(decimalsBN);
      const tokens = balanceBN.div(divisor).toString();
      return tokens;
    })
    return balance;
}
