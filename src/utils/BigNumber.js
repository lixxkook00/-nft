import { web3 } from "../App";

export function BigNumber(number) { 
    const BN = web3.utils.BN;

    return new BN(number);
}