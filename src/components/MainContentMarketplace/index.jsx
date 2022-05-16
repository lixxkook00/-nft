import React from 'react'
import './MainContentMarketplace.scss'

import HeaderMarketplace from '../HeaderMarketplace'
import ShoeCart from '../ShoeCart'

export default function MainContentMarketplace() {
  return (
    <div className="marketplace-content">
        <div className="container">
          <div className="row">
            {/* header */}
            <div className="col-xl-12">
              <HeaderMarketplace />
            </div>

            {/* search */}
            <div className="col-xl-12">
              <div className="marketplace-content-search">
                <input type="text" className="clear-input" placeholder="Search.."/>
                <div className="marketplace-content-search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* scroll */}
        <div className="content">
          <div className="container">
            <div className="row">
              {/* banner */}
              <div className="col-xl-12">
                <div className="marketplace-content-banner">
                  <div className="row height-100">
                    <div className="col-xl-5 height-100">
                      <div className="marketplace-content-banner-img">
                        <img src="/images/Artboard 4702.png" alt="" />
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="marketplace-content-banner-text">
                        <div className="marketplace-content-banner-title">
                          The Best Move-to-Earn NFT Application
                        </div>
                        <div className="marketplace-content-banner-desc">
                          WORLD STEP is a WEB3 Fitness and lifestyle mobile app with inbuilt NFT gaming and Social-fi elements support on the BSC chain.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="marketplace-content-controls">
            <div className="marketplace-content-controls-name">
              NFT CARD
            </div>
            <div className="marketplace-content-controls-btns">
              <div className="marketplace-content-controls-btn">
                <i className="fa-solid fa-angle-left"></i>
              </div>
              <div className="marketplace-content-controls-btn">
                <i className="fa-solid fa-angle-right"></i>
              </div>
            </div>
          </div>

          {/* list shoes */}

          <div className="container">
            <div className="row">
              <div className="col-xl-3">
                  <ShoeCart />
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}
