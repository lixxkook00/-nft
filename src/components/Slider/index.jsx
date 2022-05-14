import React from 'react'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade"; 
import "swiper/css/autoplay"; 
import "swiper/css/navigation";
import "swiper/css/pagination";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { EffectFade, Navigation, Pagination,Autoplay } from "swiper";

export default function Slider() {
  return (
    <div className="slider-mobile height-100">
        <Swiper
            modules={[EffectFade, Navigation, Pagination,Autoplay]}
            spaceBetween={30}
            effect={"fade"}
            navigation={false}
            pagination={{
                clickable: true,
            }}
            autoHeight= {true}
            autoplay={{ delay: 1800 }}
            className="mySwiper"
            >
            <SwiperSlide>
                
                <img src="/images/demo app - login-02.png"/>
                
            </SwiperSlide>
            <SwiperSlide>
                
                <img src="/images/demo app - market-02.png"/>
                
            </SwiperSlide>
            <SwiperSlide>
                
                <img src="/images/demo app - info-02.png"/>
                
            </SwiperSlide>
            <SwiperSlide>
                
                <img src="/images/demo app - home-02.png"/>
                
            </SwiperSlide>
            <SwiperSlide>
                
                <img src="/images/demo app - Collections-02.png"/>
                
            </SwiperSlide>
        </Swiper>
    </div>
  )
}
