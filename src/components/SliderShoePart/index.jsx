import React, {useState } from "react";

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

import './SliderShoePart.scss'

export default function SliderShoePart({swiperRef}) {


  return (
    <div className="slider-shoe pattern-img">
        <Swiper
            modules={[Pagination,Autoplay]}
            slidesPerView={1}
            spaceBetween={1}
            navigation={{
                nextEl: ".next"
            }}
            autoHeight= {true}
            autoplay={false}
            className="mySwiper"
            ref={swiperRef}
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
  );
}
