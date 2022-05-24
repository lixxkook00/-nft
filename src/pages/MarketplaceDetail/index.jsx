import React from 'react'
import '../Marketplace/Marketplace.scss'

// components
import SideBarMarketplace from '../../components/SideBarMarketplace'
import DetailMarketplace  from '../../components/DetailMarketplace'

export default function MarketplaceDetail() {
  return (
    <div className="marketplace">

       <SideBarMarketplace />

       <DetailMarketplace />
    </div>
  )
}
