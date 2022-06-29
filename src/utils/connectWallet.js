import Web3 from 'web3'
const Config = JSON.parse(localStorage.getItem('Config'))
const chainId = Config ? Config.chainId : null
const netWork = Config ? Config.netWork : null
const web3 = Config ? new Web3(Config.rpcUrl) : null

export async function listenEvent() {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', async function (accounts) {
      window.location.reload()
    })
    window.ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload()
    })
  }
}

export async function connectWallet() {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const metamaskChainId = web3.utils.toBN(window.ethereum.chainId).toNumber()
    // console.log(window.ethereum.selectedAddress)
    // if (metamaskChainId !== chainId) {
    //   alert(`Wrong network, select ${netWork} and try again!`);
    //   window.location.reload();
    // }
    // else {
    //   if (window.ethereum && !window.ethereum.selectedAddress) {
    //     window.ethereum.request({ method: "eth_requestAccounts" });
    //   }
    // }
    if (window.ethereum.selectedAddress) {
      return window.ethereum.selectedAddress
    }
    return null
  }
  //////////// Bridge Wallet Connect /////////////////

  // else {
  //   const walletConnector = new NodeWalletConnect(
  //     {
  //       bridge: "https://bridge.walletconnect.org", // Required
  //     },
  //     {
  //       clientMeta: {
  //         description: "WalletConnect NodeJS Client",
  //         url: "https://nodejs.org/en/",
  //         icons: ["https://nodejs.org/static/images/logo.svg"],
  //         name: "WalletConnect",
  //       },
  //     }
  //   );
  //   // console.log('cnn',walletConnector.killSession);
  //   // Check if connection is already established
  //   if (!walletConnector.connected) {
  //     // create new session
  //     walletConnector.createSession().then((result) => {
  //       // get uri for QR Code modal
  //       console.log("result ne", result);
  //       const uri = walletConnector.uri;
  //       // display QR Code modal
  //       WalletConnectQRCodeModal.open(
  //         uri,
  //         () => {
  //           console.log("QR Code Modal closed");
  //         },
  //         true // isNode = true
  //       );
  //     });
  //   }
  //   if (walletConnector.connected) {
  //     // walletConnector.
  //     // console.log('Name : ',walletConnector);
  //     // console.log(window.localStorage.walletconnect)
  //     var xxx = $this.state.connectedWallet;
  //     xxx.status = true;
  //     xxx.address = walletConnector.accounts[0];
  //     xxx.chainId = "0x" + walletConnector.chainId;
  //     xxx.balanceBNB = 9999;
  //     // xxx.chainId = window.ethereum.chainId;
  //     xxx.wallet = "ANOTHER";
  //     xxx.connector = walletConnector;
  //     $this.setState({ connectedWallet: xxx });
  //     //   var balanceBNB = await window.ethereum.request({ method: "eth_getBalance", "params": [window.ethereum.selectedAddress, "latest"] });
  //     //   xxx.balanceBNB = web3.utils.fromWei(balanceBNB, "ether");
  //   }
  //   // Subscribe to connection events
  //   walletConnector.on("connect", async (error, payload) => {
  //     console.log('update ne',payload);
  //     if (error) {
  //       throw error;
  //     }

  //     // Close QR Code Modal
  //     WalletConnectQRCodeModal.close(
  //       true // isNode = true
  //     );

  //     // Get provided accounts and chainId
  //     const { accounts, chainId } = payload.params[0];
  //     // if(chainId !== 56) {
  //     //   alert('Only support BSC Mainnet');
  //     //   await walletConnector.killSession();
  //     //   window.location.reload();
  //     // }
  //     console.log( accounts, chainId);
  //     window.location.reload();
  //   });

  //   walletConnector.on("session_update", (error, payload) => {
  //     if (error) {
  //       throw error;
  //     }
  //     // console.log('paylak',payload.params[0].accounts)
  //     // Get updated accounts and chainId
  //     const { accounts, chainId } = payload.params[0];
  //     // console.log(accounts);
  //     // console.log('aaaaaaaaaa',walletConnector)
  //     var xxx = $this.state.connectedWallet;
  //     xxx.status = true;
  //     xxx.address = accounts;
  //     xxx.chainId = "0x" + chainId;
  //     xxx.balanceBNB = 9999;
  //     // // xxx.chainId = window.ethereum.chainId;
  //     xxx.wallet = "ANOTHER";
  //     xxx.connector = walletConnector;
  //     $this.setState({ connectedWallet: xxx });
  //     window.location.reload();
  //     // else{
  //     //   console.log('Changing Chain')
  //     //   xxx.chainId = "0x" + walletConnector.chainId;
  //     // }
  //     // console.log(xxx.address);
  //     // console.log($this.state.connectedWallet.address)
  //     // console.log($this.state.connectedWallet.chainId)
  //   });
  //   walletConnector.on("chain_update", (error,payload) => {
  //      console.log(payload);

  //      if (error) {
  //       throw error;
  //     }
  //     // alert('disconnecting');
  //     window.location.reload();
  //     // Delete walletConnector
  //   })

  //   walletConnector.on("disconnect", (error, payload) => {
  //     // console.log(payload);
  //     if (error) {
  //       throw error;
  //     }
  //     // alert('disconnecting');
  //     // window.location.reload();
  //     // Delete walletConnector
  //   });
  // }
}

/* 


  async connectWallet() { 
    const $this = this;
    const web3 =await Web3Provider();
    console.log('aaaaaaaaaaaaaaa',web3);
    // console.log('chainId')
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      if (window.ethereum && !window.ethereum.selectedAddress) {
        window.ethereum.request({ method: "eth_requestAccounts" });
      }
      if (window.ethereum) {
        console.log("chainId", window.ethereum.chainId);
        // unLoad()
        // if (window.ethereum.chainId == '0x38') {
        if (
          window.ethereum &&
          window.ethereum.selectedAddress &&
          window.ethereum.selectedAddress !== $this.state.connectedWallet.address
        ) {
          var xxx = $this.state.connectedWallet;
          xxx.status = true;
          xxx.address = window.ethereum.selectedAddress;
          xxx.chainId = window.ethereum.chainId;
          xxx.wallet = "METAMASK";
          var balanceBNB = await window.ethereum.request({
            method: "eth_getBalance",
            params: [window.ethereum.selectedAddress, "latest"],
          });
          xxx.balanceBNB = web3.utils.fromWei(balanceBNB, "ether");
          $this.setState({ connectedWallet: xxx });
        }
        // }
        // else {
        //   alert('Select BSC Testnet chain, please!!!');
        //   window.location.reload();
        // }
      }

      window.ethereum.on("accountsChanged", async function (accounts) {
        console.log('change account ne',accounts);
        // console.log('change change change');
        // Time to reload your interface with accounts[0]!
        if (
          window.ethereum &&
          window.ethereum.selectedAddress &&
          window.ethereum.selectedAddress !== $this.state.connectedWallet.address
        ) {
          var xxx = $this.state.connectedWallet;
          xxx.status = true;
          xxx.address = window.ethereum.selectedAddress;
          xxx.chainId = window.ethereum.chainId;
          xxx.wallet = "METAMASK";
          var balanceBNB = await window.ethereum.request({
            method: "eth_getBalance",
            params: [window.ethereum.selectedAddress, "latest"],
          });
          xxx.balanceBNB = web3.utils.fromWei(balanceBNB, "ether");
          $this.setState({ connectedWallet: xxx }, () => { 
          window.location.reload();

          });  
          // console.log("new state : ", $this.state);
          // $this.setState({ connectedWallet: { status: true, address: window.ethereum.selectedAddress } });
        }
      });
      window.ethereum.on("chainChanged", (chainId) => { 
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    } 

    //////////// Bridge Wallet Connect /////////////////

    // else {
    //   const walletConnector = new NodeWalletConnect(
    //     {
    //       bridge: "https://bridge.walletconnect.org", // Required
    //     },
    //     {
    //       clientMeta: {
    //         description: "WalletConnect NodeJS Client",
    //         url: "https://nodejs.org/en/",
    //         icons: ["https://nodejs.org/static/images/logo.svg"],
    //         name: "WalletConnect",
    //       },
    //     }
    //   );
    //   // console.log('cnn',walletConnector.killSession);
    //   // Check if connection is already established
    //   if (!walletConnector.connected) {
    //     // create new session
    //     walletConnector.createSession().then((result) => {
    //       // get uri for QR Code modal
    //       console.log("result ne", result);
    //       const uri = walletConnector.uri;
    //       // display QR Code modal
    //       WalletConnectQRCodeModal.open(
    //         uri,
    //         () => {
    //           console.log("QR Code Modal closed");
    //         },
    //         true // isNode = true
    //       );
    //     });
    //   }
    //   if (walletConnector.connected) {
    //     // walletConnector.
    //     // console.log('Name : ',walletConnector);
    //     // console.log(window.localStorage.walletconnect)
    //     var xxx = $this.state.connectedWallet;
    //     xxx.status = true;
    //     xxx.address = walletConnector.accounts[0];
    //     xxx.chainId = "0x" + walletConnector.chainId;
    //     xxx.balanceBNB = 9999;
    //     // xxx.chainId = window.ethereum.chainId;
    //     xxx.wallet = "ANOTHER";
    //     xxx.connector = walletConnector;
    //     $this.setState({ connectedWallet: xxx });
    //     //   var balanceBNB = await window.ethereum.request({ method: "eth_getBalance", "params": [window.ethereum.selectedAddress, "latest"] });
    //     //   xxx.balanceBNB = web3.utils.fromWei(balanceBNB, "ether");
    //   }
    //   // Subscribe to connection events
    //   walletConnector.on("connect", async (error, payload) => {
    //     console.log('update ne',payload);
    //     if (error) {
    //       throw error;
    //     }
        

    //     // Close QR Code Modal
    //     WalletConnectQRCodeModal.close(
    //       true // isNode = true
    //     );

    //     // Get provided accounts and chainId
    //     const { accounts, chainId } = payload.params[0];
    //     // if(chainId !== 56) { 
    //     //   alert('Only support BSC Mainnet');
    //     //   await walletConnector.killSession();
    //     //   window.location.reload();
    //     // }
    //     console.log( accounts, chainId);
    //     window.location.reload();
    //   });

    //   walletConnector.on("session_update", (error, payload) => {
    //     if (error) {
    //       throw error;
    //     }
    //     // console.log('paylak',payload.params[0].accounts)
    //     // Get updated accounts and chainId
    //     const { accounts, chainId } = payload.params[0];
    //     // console.log(accounts);
    //     // console.log('aaaaaaaaaa',walletConnector)
    //     var xxx = $this.state.connectedWallet;
    //     xxx.status = true;
    //     xxx.address = accounts;
    //     xxx.chainId = "0x" + chainId;
    //     xxx.balanceBNB = 9999;
    //     // // xxx.chainId = window.ethereum.chainId;
    //     xxx.wallet = "ANOTHER";
    //     xxx.connector = walletConnector;
    //     $this.setState({ connectedWallet: xxx });
    //     window.location.reload();
    //     // else{ 
    //     //   console.log('Changing Chain')
    //     //   xxx.chainId = "0x" + walletConnector.chainId;
    //     // }
    //     // console.log(xxx.address);
    //     // console.log($this.state.connectedWallet.address)  
    //     // console.log($this.state.connectedWallet.chainId)
    //   });
    //   walletConnector.on("chain_update", (error,payload) => { 
    //      console.log(payload);
        
    //      if (error) {
    //       throw error;
    //     }
    //     // alert('disconnecting');
    //     window.location.reload();
    //     // Delete walletConnector
    //   })

    //   walletConnector.on("disconnect", (error, payload) => {
    //     // console.log(payload);
    //     if (error) {
    //       throw error;
    //     }
    //     // alert('disconnecting');
    //     // window.location.reload();
    //     // Delete walletConnector
    //   });
    // }
  }
*/
