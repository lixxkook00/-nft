import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <div className="footer">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="footer-content">
                        <div className="footer-content-text">
                            © 2022 WorldStep
                        </div>
                        <div className="footer-content-socials">
                            <a href="https://twitter.com/WorldStepAnn" className="footer-content-socials-item">
                                <img src="/images/Artboard 3802.png" alt="" />
                            </a>
                            <a href="http://dsc.gg/worldstep" className="footer-content-socials-item">
                                <img src="/images/Artboard 3602.png" alt="" />
                            </a>
                            <a href="https://t.me/WorldStepOfficia" className="footer-content-socials-item">
                                <img src="/images/Artboard 3402.png" alt="" />
                            </a>
                            <a href="https://t.me/WorldStepOfficialAnnouncement" className="footer-content-socials-item">
                                <img src="/images/Artboard 3302.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
