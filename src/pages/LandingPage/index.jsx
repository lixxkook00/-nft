import React ,{useRef}from 'react'
import './LandingPage.scss'

import {Link} from 'react-router-dom'

// import Header from '../../components/Header'
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

export default function LandingPage({isLoading}) {

  const ntfRef = useRef(null);
  const ntfAbout = useRef(null);
  const ntfTokenomic = useRef(null);
  const ntfWhitepaper = useRef(null);

  const executeScrollNTF = () => ntfRef.current.scrollIntoView({ behavior: "smooth" })    
  const executeScrollAbout = () => ntfAbout.current.scrollIntoView({ behavior: "smooth" })    
  const executeScrollToken = () => ntfTokenomic.current.scrollIntoView({ behavior: "smooth" })    
  const executeScrollWhitepaper = () => ntfWhitepaper.current.scrollIntoView({ behavior: "smooth" })    

  return (
    <div className={`landing-page ${isLoading ? "height-100vh" : ""} `}>
         <div className="header-wrap hidden-m hidden-tl">
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
                                  Tokenomics
                                </div>
                                <div className="header-nav-item">
                                  Whitepaper
                                </div>
                                <Link to={"/market-place"} className="header-nav-item">
                                  Marketplace
                                </Link>
                                <Link to={"/sign-up"} className="header-nav-item">
                                  Sign Up
                                </Link>
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
