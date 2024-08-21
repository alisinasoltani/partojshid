"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import slide1 from"@/public/images/Slide1.jpg";
// import slide10 from"@/public/images/Slide10.jpg";
import slide11 from"@/public/images/Slide11.jpg";
import slide12 from"@/public/images/Slide12.jpg";
import slide13 from"@/public/images/Slide13.jpg";
import slide14 from"@/public/images/Slide14.jpg";
import slide16 from"@/public/images/Slide16.jpg";
import slide20 from"@/public/images/slide20.png";

export default function Slider() {
  return (
      <Swiper className="xl:h-[100vh] lg:h-[60vh] md:h-[40vh] h-[30vh]" modules={[Navigation, Autoplay]} navigation={true} style={{zIndex: 0}}
      loop={true} autoplay={{delay: 7000, disableOnInteraction: false}}>
        <SwiperSlide>
          <Image src={slide14} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide11} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide13} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide20} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide1} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide12} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide16} fill={true} />
        </SwiperSlide>
      </Swiper>
  );
}
