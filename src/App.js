import './App.scss';
import {useState,useEffect} from 'react'
import LandingPage from './pages/LandingPage'
import LoadingScreen from './pages/LoadingScreen';

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
      
    </div>
  );
}

export default App;
