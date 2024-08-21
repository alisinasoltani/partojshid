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
import Slide5 from"@/public/images/lodge/slide5.jpg";
import Slide6 from"@/public/images/lodge/slide6.jpg";
import Slide7 from"@/public/images/lodge/slide7.jpg";
import Slide8 from"@/public/images/lodge/slide8.jpg";
import Slide9 from"@/public/images/lodge/slide9.jpg";
import Slide10 from"@/public/images/lodge/slide10.jpg";
import Slide11 from"@/public/images/lodge/slide11.jpg";
import Slide12 from"@/public/images/lodge/slide12.jpg";
import Slide13 from"@/public/images/lodge/slide13.jpg";

export default function LodgeSlider() {
  return (
      <Swiper className="xl:h-[110vh] lg:h-[60vh] md:h-[40vh] h-[30vh]" modules={[Navigation, Autoplay]} navigation={true} style={{zIndex: 0}}
      loop={true} autoplay={{delay: 7000, disableOnInteraction: false}}>
        <SwiperSlide>
          <Image src={Slide12} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide13} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
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
        <SwiperSlide>
          <Image src={Slide5} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide6} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide7} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide8} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide9} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide10} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide11} fill={true} alt="Lodge Projects Picture" />
        </SwiperSlide>
      </Swiper>
  );
}
