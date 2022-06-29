import './App.scss';
import {useState,useEffect} from 'react'

// pages
import LandingPage from './pages/LandingPage'
import LoadingScreen from './pages/LoadingScreen';
import Marketplace from './pages/Marketplace'
import MarketplaceDetail from './pages/MarketplaceDetail';
import { Web3Provider } from './utils/Web3Provider'
import { getConfig } from './Config/config'
import { connectWallet, listenEvent } from './utils/connectWallet'

import Routers from './routers/Routers'

function App() {

  const [isLoading,setIsLoading] = useState(true)
  const [account, setAccount] = useState() // state variable to set account.
  useEffect(() => {
    async function load() {
      await getConfig();
      await Web3Provider();
      await connectWallet();
    }
    load()
    listenEvent()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  },[])

  return (
    <div className="App">

      <Routers />

      {/* {isLoading && <LoadingScreen/>} */}

      {/* <LandingPage isLoading={isLoading}/> */}
      
      {/* <Marketplace /> */}

      {/* <MarketplaceDetail /> */}
    </div>
  );
}

export default App;
