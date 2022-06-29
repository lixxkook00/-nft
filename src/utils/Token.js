import {NFTContract, TokenContract} from './ContractGenerator'
import { connectWallet } from './connectWallet';
import { Web3Provider } from './Web3Provider';


const Config = JSON.parse(localStorage.getItem('Config'));
const StackingAddress = Config ? Config.StackingAddress : null;
const TokenAddress = Config ? Config.TokenAddress : null;



export async function approveToken(amount,sponsorAddress) {
    await connectWallet();
    const web3 = await Web3Provider();
    console.log(window.ethereum.chainId);
    
    const contractToken = await TokenContract();
    var data = contractToken.methods['approve'](sponsorAddress, web3.utils.toWei(amount,'ether')).encodeABI();
    console.log(data);
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: TokenAddress, // Required except during contract publications.
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

export async function allowance(spender) { 
    await connectWallet();
    const contractToken = await TokenContract();
    const allowance = await contractToken.methods['allowance'](window.ethereum.selectedAddress,spender).call();
    console.log('allowance',allowance)
    return allowance;
}