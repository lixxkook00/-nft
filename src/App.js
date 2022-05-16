import './App.scss';
import {useState,useEffect} from 'react'

// pages
import LandingPage from './pages/LandingPage'
import LoadingScreen from './pages/LoadingScreen';
import Marketplace from './pages/Marketplace'

function App() {

  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  },[])

  return (
    <div className="App">

      {isLoading && <LoadingScreen/>}

      <LandingPage isLoading={isLoading}/>
      
      {/* <Marketplace /> */}
    </div>
  );
}

export default App;
