"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
// import { Navigation } from "swiper/modules";
import Image from "next/image";
import Slide1 from"@/public/images/lodge/slide1.jpg";
import Slide2 from"@/public/images/lodge/slide2.jpg";
import Slide3 from"@/public/images/lodge/slide3.jpg";
import Slide4 from"@/public/images/lodge/slide4.jpg";

export default function LodgeSlider() {
  return (
      <Swiper className="xl:h-[100vh] lg:h-[60vh] md:h-[40vh] h-[30vh]" modules={[Navigation, Autoplay]} navigation={true} style={{zIndex: 0}}
      loop={true} autoplay={{delay: 7000, disableOnInteraction: false}}>
        <SwiperSlide>
          <Image src={Slide1} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide2} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide3} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide4} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
      </Swiper>
  );
}
