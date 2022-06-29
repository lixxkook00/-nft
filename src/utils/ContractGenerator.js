import { toast } from "react-toastify";
import axios from "axios";
import { approve } from "./Wallet";
import { Load, unLoad } from "./Loader";
import Web3 from "web3";


const Config = JSON.parse(localStorage.getItem('Config'));

const TokenABI = Config ? Config.TokenABI : null;
const TokenAddress = Config ? Config.TokenAddress : null;

const NFTAddress = Config ? Config.NFTAddress : null;
const NFTABI = Config ? Config.NFTABI : null;

const BUSDSmartContractABI = Config ? Config.BUSDSmartContractABI : null;
const BUSDSmartContractAddress = Config ? Config.BUSDSmartContractAddress : null;

const StackingAddress = Config ? Config.StackingAddress : null;
const StackingABI = Config ? Config.StakingABI : null;

const MarketplaceAddress = Config ? Config.MarketplaceAddress : null;
const MarketplaceABI = Config ? Config.MarketplaceABI : null;

const payBackAddress = Config ? Config.payBackAddress : null;
const payBackABI = Config ? Config.payBackABI : null;

const rpcUrl = Config ? Config.rpcUrl : null;
const web3 = Config ? new Web3(rpcUrl) : null;


export async function BUSDContract() { 
    const contractBUSD = await new web3.eth.Contract( 
        JSON.parse(BUSDSmartContractABI),
        BUSDSmartContractAddress,
        {}
    );
    return contractBUSD;
}

export async function TokenContract() { 
    const contractToken = await new web3.eth.Contract( 
        JSON.parse(TokenABI),
        TokenAddress,
        {}
    );
    return contractToken;
}

export async function NFTContract() { 
    const contractNFT = await new web3.eth.Contract( 
        JSON.parse(NFTABI),
        NFTAddress,
        {}
    );
    return contractNFT;
}

export async function StackingContract() { 
    const contractStacking = await new web3.eth.Contract( 
        JSON.parse(StackingABI),
        StackingAddress,
        {}
    );
    return contractStacking;
}

export async function MarketplaceContract() { 
    const contractMarketplace = await new web3.eth.Contract( 
        JSON.parse(MarketplaceABI),
        MarketplaceAddress,
        {}
    );
    return contractMarketplace;
}

export async function PaybackContract() { 
    const contractPayback = await new web3.eth.Contract(
        JSON.parse(payBackABI),
        payBackAddress,
        {}
    );
    return contractPayback;
}

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

// export async function NFTContract() { 
//     const contractNFT = await new web3.eth.Contract( 
//         JSON.parse(NFTSmartContractABI),
//         NFTSmartContractAddress,
//         {}
//     );
//     return contractNFT;
// }

// export async function FactoryContract() { 
//     const contractFactory = await new web3.eth.Contract( 
//         JSON.parse(FactorySmartContractABI),
//         FactorySmartContractAddress,
//         {}
//     );
//     return contractFactory;
// }


