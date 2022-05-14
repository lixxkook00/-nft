import React from 'react'
import './Header.scss'

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


export default function Header() {
  return (
   <div className="header-wrap">
        <div className="container">
            <div className="row">
                <div className="col-xl-12 position-relative">
                    <div className="header">
                        <div className="header-logo">
                            <img src="/images/Artboard 402.png" alt="" />
                        </div>
                        <div className="header-nav-list">
                            {
                                listNavItem.map((item,index) => {
                                    return (
                                            <div className="header-nav-item">
                                                {item.title}
                                            </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  )
}
