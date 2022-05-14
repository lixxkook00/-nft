import React ,{useRef}from 'react'
import './LandingPage.scss'

import Header from '../../components/Header'
import Footer  from '../../components/Footer'
import ContentLandingPage from '../../components/ContentLandingPage'

const listNavItem = [
    {
        title:"NFTs",
        href:"",
    },
    {
        title:"About Project",
        href:"",
    },
    {
        title:"Tokenomic",
        href:"",
    },
    {
        title:"Whitepaper",
        href:"",
    },
    {
        title:"Marketplace",
        href:"",
    },
]

export default function LandingPage() {

  const ntfRef = useRef(null);
  const ntfAbout = useRef(null);
  const ntfTokenomic = useRef(null);
  const ntfWhitepaper = useRef(null);

  const executeScrollNTF = () => ntfRef.current.scrollIntoView({ behavior: "smooth" })    
  const executeScrollAbout = () => ntfAbout.current.scrollIntoView({ behavior: "smooth" })    
  const executeScrollToken = () => ntfTokenomic.current.scrollIntoView({ behavior: "smooth" })    
  const executeScrollWhitepaper = () => ntfWhitepaper.current.scrollIntoView({ behavior: "smooth" })    

  return (
    <div className="landing-page">
         <div className="header-wrap hidden-m">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 position-relative">
                        <div className="header">
                            <div className="header-logo">
                                <img src="/images/Artboard 402.png" alt="" />
                            </div>
                            <div className="header-nav-list">
                                <div className="header-nav-item" onClick={() => executeScrollNTF()}>
                                  NFTs
                                </div>
                                <div className="header-nav-item" onClick={() => executeScrollAbout()}>
                                  About Project
                                </div>
                                <div className="header-nav-item" onClick={() => executeScrollToken()}>
                                  Tokenomic
                                </div>
                                <div className="header-nav-item">
                                  Whitepaper
                                </div>
                                <div className="header-nav-item">
                                  Marketplace
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>

      

        <ContentLandingPage
          ntfRef={ntfRef}
          ntfAbout= {ntfAbout}
          ntfTokenomic= {ntfTokenomic}
          ntfWhitepaper= {ntfWhitepaper}
          executeScrollNTF = {executeScrollNTF}
          executeScrollAbout = {executeScrollAbout}
          executeScrollToken = {executeScrollToken}
        />

        <Footer />
    </div>
  )
}
