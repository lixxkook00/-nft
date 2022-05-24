import './App.scss';
import {useState,useEffect} from 'react'

// pages
import LandingPage from './pages/LandingPage'
import LoadingScreen from './pages/LoadingScreen';
import Marketplace from './pages/Marketplace'
import MarketplaceDetail from './pages/MarketplaceDetail';

import Routers from './routers/Routers'

function App() {

  const [isLoading,setIsLoading] = useState(true)

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
