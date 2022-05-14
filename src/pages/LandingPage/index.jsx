import React ,{useRef}from 'react'
import './LandingPage.scss'

import Header from '../../components/Header'
import Footer  from '../../components/Footer'
import ContentLandingPage from '../../components/ContentLandingPage'

export default function LandingPage() {

  const ntfRef = useRef(null);

  const executeScroll = () => ntfRef.current.scrollIntoView()    

  return (
    <div className="landing-page">

        <Header executeScroll={executeScroll}/>

        <ContentLandingPage 
          ntfRef={ntfRef}  
        />

        <Footer />
    </div>
  )
}
