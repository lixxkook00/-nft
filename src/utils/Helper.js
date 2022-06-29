import { connectWallet } from "./connectWallet";
import { Web3Provider } from "./Web3Provider";

export const asyncInterval = async (hash) => {
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