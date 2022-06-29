import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";


const Connector = () => {
        const walletConnector = new NodeWalletConnect(
            {
              bridge: "https://bridge.walletconnect.org", // Required
            },
            {
              clientMeta: {
                description: "WalletConnect NodeJS Client",
                url: "https://nodejs.org/en/",
                icons: ["https://nodejs.org/static/images/logo.svg"],
                name: "WalletConnect",
              },
            }
          );
          // Check if connection is already established
          if (!walletConnector.connected) {
            // create new session
            walletConnector.createSession().then((result) => {
              // get uri for QR Code modal
              console.log('result ne',result)
              const uri = walletConnector.uri;
              // display QR Code modal
              WalletConnectQRCodeModal.open(
                uri,
                () => {
                  console.log("QR Code Modal closed");
                },
                true // isNode = true
              );
            });
          }
          if(walletConnector.connected) { 
            // console.log(wa)
            console.log('walletConnector2222',walletConnector);
          }
          return walletConnector;
    }
export default Connector;













  