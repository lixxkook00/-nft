import React from 'react'
import './ContentLandingPage.scss'

export default function ContentLandingPage() {
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-xl-7 mt-80">
                        <div className="title">
                            The Best Move-to-Earn NFT Application
                        </div>
                        <span className="span-large">
                            WORLD STEP is a WEB3 Fitness and lifestyle mobile 
                            app with inbuilt NFT gaming and Social-fi elements 
                            support on the BSC chain.
                        </span>
                        <button className="primary-btn mt-50">
                            Download Now
                        </button>
                    </div>

                    <div className="col-xl-5 mt-80">
                        <div className="shoe-img">
                            <div className="shoe-bg"></div>
                            <img src="/images/Artboard 602.png" alt="" />
                        </div>
                    </div>

                    {/* ----------- */}
                    <div className="col-xl-12 mt-80 mb-30">
                        <div className="title-nft">
                            NFTs
                        </div>
                    </div>

                    {/* slider shoes */}
                    <div className="col-xl-12">
                        <div className="slider">
                            {/* main image */}
                            <div className="slider-img centering">
                                <img src="/images/Artboard 702.png" alt="" />
                            </div>

                            {/* detail */}
                            <div className="slider-detail">
                                {/* controls */}
                                <div className="slider-detail-controls">
                                <div className="controls-left">
                                    <i class="fa-regular fa-circle-left"></i>
                                </div>
                                <div className="controls-right">
                                    <i class="fa-regular fa-circle-right active"></i>
                                </div>
                                </div>

                                {/* text */}
                                <div className="slider-detail-text">
                                    BACKGROUND
                                    <img src="/images/Artboard 8102.png" alt="" className="slider-detail-text-line" />
                                    <div className="slider-detail-text-num">
                                        01
                                    </div>
                                </div>

                                <div className="slider-detail-pattern">
                                    <img src="/images/Artboard 902.png" alt="" className="pattern-img" />
                                    <img src="/images/Artboard 6602.png" alt="" className="pattern-border" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* paragraph */}
                    <div className="col-xl-12">
                        <span className="paragraph">
                            The story of the NFTs of our NFTs will 
                            be unique. We will draw inspiration 
                            from the five continents: America, 
                            Europe, Asia, Africa, and Oceania, 
                            as well as the symbols of the countries 
                            we will design. We created the NFT 
                            collection in the hope that fans will 
                            be able to cheer on athletes from their 
                            home countries by wearing it.
                        </span>
                    </div>

                    {/* img */}
                    <div className="col-xl-12">
                        <img src="/images/Artboard 1102.png" alt="" />
                    </div>

                    {/* primary title */}
                    <div className="col-xl-12">
                        <div className="primary-title centering">
                            <img src="/images/Artboard 8302.png" alt="" className="primary-title-bg" />
                            <span>About Project</span>
                        </div>
                    </div>
            </div>
        </div>
        <div className="about">
            <div className="container">
                <div className="row">  
                    <div className="col-xl-6">
                        <img src="/images/Artboard 1302.png" alt="" />
                    </div>

                    <div className="col-xl-6 centering pd-0-30">
                        <span className="span-large ">
                            The Olympics are a worldwide sports 
                            festival that brings together excellent 
                            athletes from all over the world and 
                            passionate fans from around the world. 
                            We want to build a world of exercise to 
                            earn where everyone, from athletes to 
                            their avid fans, can join in the same workout for good health and earn at the same time. more income from exercise, and that's why World Step was born.
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="vision">
            <div className="container">
                <div className="row">  
                    <div className="col-xl-6 centering pd-0-30 to-column">
                        <div className="second-btn mb-20">
                            Vision
                        </div>
                        <span className="span-large ">
                            The Olympics are a worldwide sports 
                            festival that brings together excellent 
                            athletes from all over the world and 
                            passionate fans from around the world. 
                            We want to build a world of exercise to 
                            earn where everyone, from athletes to 
                            their avid fans, can join in the same workout for good health and earn at the same time. more income from exercise, and that's why World Step was born.
                        </span>
                    </div>
                    <div className="col-xl-6">
                        <img src="/images/Artboard 1502.png" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div className="about">
            <div className="container">
                <div className="row">  
                    <div className="col-xl-6">
                        <img src="/images/Artboard 1302.png" alt="" />
                    </div>

                    <div className="col-xl-6 centering pd-0-30">
                        <span className="span-large ">
                            The Olympics are a worldwide sports 
                            festival that brings together excellent 
                            athletes from all over the world and 
                            passionate fans from around the world. 
                            We want to build a world of exercise to 
                            earn where everyone, from athletes to 
                            their avid fans, can join in the same workout for good health and earn at the same time. more income from exercise, and that's why World Step was born.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
