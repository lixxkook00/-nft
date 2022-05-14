import React,{useRef,useState} from 'react'

import './ContentLandingPage.scss'

import Slider from '../Slider'
import CircleChart from '../CircleChart'
import SliderShoePart from '../SliderShoePart'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade"; 
import "swiper/css/autoplay"; 
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import {Pagination,Autoplay } from "swiper";


const memberList = [
    {
        avt:"samuel02.png",
        name:"Samuel",
        position:"FOUNDER, CEO",
        desc:"Branding specialist. Passionate in creating brands, building teams, creating value-driven projects.",
    },
    {
        avt:"selina02.png",
        name:"Selina",
        position:"FOUNDER, CMO",
        desc:"BExpert in marketing and digital strategies for 3 years. Passionate in stocks and crypto growing up."
    },
    {
        avt:"Blake02.png",
        name:"Blake",
        position:"CO-FOUNDER, COMMUNITY LEAD",
        desc:"More than 2 years experience in trading crypto, stocks and community building.",
    },
    {
        avt:"Lux02.png",
        name:"Lux",
        position:"DEVELOPER",
        desc:"Growing up with a passion in culture and community and development along crypto.",
    },
    {
        avt:"Vincent02.png",
        name:"Vincent",
        position:"DEVELOPER",
        desc:"4 years journey in system development. All started with a passion to create the difference.",
    }
]

const showPartList = [
    { 
        id:1, 
        name:"BACKGROUND"
    },
    { 
        id:2, 
        name:"LACE GUARD"
    },
    { 
        id:3, 
        name:"MIDDLE"
    },
    { 
        id:4, 
        name:"HEEL"
    },
    { 
        id:5, 
        name:"TOE"
    },
    { 
        id:6, 
        name:"TONGUE"
    },
    { 
        id:7, 
        name:"SOLE"
    },
]

export default function ContentLandingPage({ntfRef}) {

    const [indexShoePartActive,setIndexShoePartActive] = useState(0)

    const swiperPattern = useRef(null);
    const swiperNum = useRef(null);

    const handlePrevShoePart = () => {
        swiperPattern.current.swiper.slidePrev()
        swiperNum.current.swiper.slidePrev()
        if(indexShoePartActive == 0){
            setIndexShoePartActive(6)
        }else{
            setIndexShoePartActive(indexShoePartActive-1)
        }
        console.log(showPartList[indexShoePartActive].name)
    }

    const handleNextShoePart = () => {
        swiperPattern.current.swiper.slideNext()
        swiperNum.current.swiper.slideNext()

        if(indexShoePartActive == 6){
            setIndexShoePartActive(0)
        }else{
            setIndexShoePartActive(indexShoePartActive+1)
        }
        console.log(showPartList[indexShoePartActive].name)
    }

  return (
    <>
        <div className="container mt-100">
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
                            Coming Soon
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
                    <div className="col-xl-12" ref={ntfRef}>
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
                                        <i onClick={() => handlePrevShoePart()} class="prev fa-regular fa-circle-left"></i>
                                    </div>
                                    <div className="controls-right">
                                        <i onClick={() => handleNextShoePart()} class="next fa-regular fa-circle-right active"></i>
                                    </div>
                                </div>

                                {/* text */}
                                <div className="slider-detail-text">
                                    
                                    {showPartList[indexShoePartActive].name}

                                    <img src="/images/Artboard 8102.png" alt="" className="slider-detail-text-line" />
                                    <div className="slider-detail-text-num">
                                       {/* slide num */}
                                        <div className="slider-num pattern-img">
                                            <Swiper
                                                modules={[Pagination,Autoplay]}
                                                slidesPerView={1}
                                                spaceBetween={1}
                                                loop={true}
                                                navigation={false}
                                                autoHeight= {true}
                                                autoplay={false}
                                                className="mySwiper"
                                                ref={swiperNum}
                                            >
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 102.png" alt="" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 1 copy02.png" alt="" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 1 copy 202.png" alt="" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 1 copy 302.png" alt="" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 1 copy 402.png" alt="" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 1 copy 502.png" alt="" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src="/images/Artboard 1 copy 602.png" alt="" />
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>

                                {/* pattern */}
                                <div className="slider-detail-pattern">
                                    {/* slide pattern */}
                                    <div className="slider-shoe pattern-img">
                                        <Swiper
                                            modules={[Pagination,Autoplay]}
                                            slidesPerView={1}
                                            spaceBetween={1}
                                            loop={true}
                                            navigation={false}
                                            autoHeight= {true}
                                            autoplay={false}
                                            className="mySwiper"
                                            ref={swiperPattern}
                                        >
                                            <SwiperSlide>
                                                <img src="/images/Artboard 902.png" alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="/images/dƒy02.png" alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="/images/m  gi…y02.png" alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="/images/gขt02.png" alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="/images/mũi02.png" alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="/images/logo02.png" alt="" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="/images/đế02.png" alt="" />
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
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
                            We hope to create a world of metaverse sports where no one is limited in their favorite sport, such as football, track and field, basketball, swimming, badminton, and so on, and to create E-Sport tournaments for the entire world using Web3 technology.
                        </span>
                    </div>
                    <div className="col-xl-6">
                        <img src="/images/Artboard 1502.png" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div className="mission">
            <div className="container">
                <div className="row">  
                    <div className="col-xl-6 position-relative">
                        {/* <img src="/images/Artboard 1702.png" alt="" /> */}
                        <Slider/>
                    </div>
                    
                    <div className="col-xl-6 centering pd-0-30 to-column">
                        <div className="second-btn mb-20">
                            Mission
                        </div>
                        <span className="span-large ">
                            We want to build a world where everyone, from children to the elderly, from students to workers, from urban to rural areas, can improve their health, earn extra income, and all they need is a phone.
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="tokenomic">
            <div className="container">
                <div className="row">
                     {/* primary title */}
                    <div className="col-xl-12">
                        <div className="primary-title centering">
                            <img src="/images/Artboard 8302.png" alt="" className="primary-title-bg" />
                            <span>Tokenomic</span>
                        </div>
                    </div>

                    {/* circle chart */}
                    <div className="col-xl-12 mt-50 mb-80">
                        <CircleChart/>
                    </div>
                </div>
            </div>
        </div>

        <div className="roadmap">
            <div className="container">
                <div className="row">
                     {/* primary title */}
                    <div className="col-xl-12">
                        <div className="primary-title centering">
                            <img src="/images/Artboard 8302.png" alt="" className="primary-title-bg" />
                            <span>Roadmap</span>
                        </div>
                    </div>

                    {/* circle chart */}
                    <div className="col-xl-12 mt-50 mb-80">
                        <img src="/images/Artboard 8502.png" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div className="ourteam">
            <div className="container">
                <div className="row">
                     {/* primary title */}
                    <div className="col-xl-12">
                        <div className="primary-title centering">
                            <img src="/images/Artboard 8302.png" alt="" className="primary-title-bg" />
                            <span>Our Team</span>
                        </div>
                    </div>

                    {/* circle chart */}
                    <div className="col-xl-12 mt-50 mb-80">
                        <div className="custom-row">
                            {/* member */}

                            {
                                memberList.map((member,index) => {
                                    return (
                                        <div key={index} className="custom-col-2">
                                            <div className="member">
                                                <div className="member-avt">
                                                    <img src={`/images/${member.avt}`} alt="" />
                                                </div>
                                                <div className="member-name">
                                                    {member.name}
                                                </div>
                                                <div className="member-position">
                                                    {member.position}
                                                </div>
                                                <div className="member-desc">
                                                    {member.desc}
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="backer">
            <div className="container">
                <div className="row">
                     {/* primary title */}
                    <div className="col-xl-12">
                        <div className="primary-title centering">
                            <img src="/images/Artboard 8302.png" alt="" className="primary-title-bg" />
                            <span>Partner</span>
                        </div>
                    </div>

                    {/* circle chart */}
                    <div className="col-xl-12 mt-30">
                        <div className="row">
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 10@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 12@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 14@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 2@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 4@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 6@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/Artboard 8@4x.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="backer-outline">
                                    <img src="/images/pinksale-logo-text-white-445x128x0x1x445x125x1637349681.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mission">
            <div className="container">
                <div className="row">  
                    <div className="col-xl-5">
                        <img src="/images/v02.png" alt="" />
                    </div>

                    <div className="col-xl-7 centering pd-0-30 to-column">
                       <div className="row">
                           <div className="col-xl-12">
                               <img src="/images/Artboard 9602.png" alt="" />
                           </div>
                           <div className="col-xl-6">
                               <img src="/images/Artboard 2802.png" alt="" />
                           </div>
                           <div className="col-xl-6">
                               <img src="/images/Artboard 3102.png" alt="" />
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>

        
    </>
  )
}
