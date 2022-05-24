import React from 'react'
import './ShoeCart.scss'

import {Link} from 'react-router-dom'

import CirclePercent from '../CirclePercent'

export default function ShoeCart({shoe}) {
  return (
    <Link to={`/market-place/${shoe.id}`} className="shoecart">
        <div className="shoecart-bg">
            <img src={`/images/backgroundCart.png`} alt="" />
        </div>

        <div className="shoecart-content">
            <div className="shoecart-content-img">
                <img src={`/images/${shoe.img}`} alt="" />
            </div>
            <div className="shoecart-content-detail">
                <div className="shoecart-content-detail-rate">
                    <CirclePercent percent={shoe.ratePercent} rate={shoe.rateNum}/>
                </div>
                <div className="shoecart-content-detail-color">
                    <img src={`/images/${shoe.background}`} alt="" />
                </div>
            </div>
        </div>
    </Link>
  )
}
