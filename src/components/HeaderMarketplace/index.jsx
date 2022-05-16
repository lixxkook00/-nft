import React from 'react'
import './HeaderMarketplace.scss'

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

export default function HeaderMarketplaces() {
  return (
    <div className="header-marketplace">
        <div className="header-marketplace-left">
            {
                listNavItem.map((item,index) => {
                    return (
                        <div key={index} className={`header-marketplace-item centering ${index===4 && 'active'}`}>
                            {item.title}
                        </div>
                    ) 
                })
            }
        </div>

        <div className="header-marketplace-right">
            <button className="primary-btn">
                Download App
            </button>
        </div>

        
    </div>
  )
}
