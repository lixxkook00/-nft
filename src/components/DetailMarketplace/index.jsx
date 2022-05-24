import React from 'react'
import './DetailMarketplace.scss'

import {Link,useParams} from 'react-router-dom'


import { LinearProgress } from '@mui/material';

import HeaderMarketplace from '../HeaderMarketplace'
import ShoeCart from '../ShoeCart'

import data from '../../data/data.json'

export default function DetailMarketplace() {

    let {_id} = useParams();

    const currentShoe = data.shoeList.find(shoe => shoe.id === _id)

  return (
     <div className="marketplace-detail">
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

        {/* DETAIL CONTENT */}
        <div className="container">
            <div className="row">
                {/* image cart shoe */}
                <div className="col-xl-4">
                    <ShoeCart shoe={currentShoe}/>
                </div>

                {/* infor show */}
                <div className="col-xl-4">
                    <div className="detail-infor">
                        <div className="detail-infor-text">
                            <div className="detail-infor-text-status">
                                NEW
                            </div>
                            <div className="detail-infor-text-name">
                                {currentShoe.name}
                            </div>
                        </div>

                        <div className="detail-infor-num">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="detail-infor-num-title">
                                        Rarity
                                    </div>
                                    <div className="detail-infor-num-value">
                                        Rare
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="detail-infor-num-title">
                                        Count
                                    </div>
                                    <div className="detail-infor-num-value">
                                        5/7
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="detail-infor-num-title">
                                        Owner
                                    </div>
                                    <div className="detail-infor-num-value">
                                        5/7
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="process-bar">
                                        <div className="process-bar-title">
                                            <div className="process-bar-title-name">
                                                Stamina
                                            </div>
                                            <div className="process-bar-title-value">
                                                60%
                                            </div>
                                        </div>
                                        <div className="process-bar-main stamina">
                                            <LinearProgress 
                                                variant="determinate" 
                                                style={{
                                                    backgroundColor: "RGBA(239, 100, 33, 0.2)",
                                                    color: "red"}}  
                                                value={60} 
                                            />
                                        </div>
                                    </div>
                                    <div className="process-bar">
                                        <div className="process-bar-title">
                                            <div className="process-bar-title-name">
                                                Mana
                                            </div>
                                            <div className="process-bar-title-value">
                                                90%
                                            </div>
                                        </div>
                                        <div className="process-bar-main mana">
                                            <LinearProgress 
                                                variant="determinate" 
                                                style={{
                                                    backgroundColor: "#0B7177",
                                                    color: "red"}}  
                                                value={90} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* control */}
                <div className="col-xl-4">
                    <div className="detail-control">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="marketplace-detail-btn marketplace-detail-btn--primary">
                                    Connect Wallet
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div className="marketplace-detail-btn marketplace-detail-btn--secondary">
                                    More Actions
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <div className="line">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="line-title">
                                                Last sale prize
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="line-usd">
                                                5000 USD
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="line-value">
                                            (200.000.000)
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="line">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="line-title">
                                                Floor prize
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="line-usd">
                                                5000 USD
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="line-value">
                                            (200.000.000)
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="line">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="line-title">
                                                Estimated prize
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="line-usd">
                                                4500 USD
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="line-value">
                                            (200.000.000)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <Link to={"/market-place"} className="back">
                        <i className="fa-solid fa-angle-left"></i>
                        <span>Back To Catalog</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
