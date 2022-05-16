import React from 'react'
import './Marketplace.scss'

// components
import SideBarMarketplace from '../../components/SideBarMarketplace'
import MainContentMarketplace  from '../../components/MainContentMarketplace'

export default function Marketplace() {
  return (
    <div className="marketplace">

       <SideBarMarketplace />
       
       <MainContentMarketplace />
    </div>
  )
}
