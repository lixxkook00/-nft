import Web3 from "web3";


export const Web3Provider = async () => { 
   const config = JSON.parse(localStorage.getItem('Config'));
   const result = new Web3(config.rpcUrl);
   return result;
}