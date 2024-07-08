"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
// import { Navigation } from "swiper/modules";
import Image from "next/image";
import Slide1 from"@/public/images/Slide1.jpg";
// import Slide2 from"@/public/images/Slide2.jpg";
import Slide12 from"@/public/images/slide12.png";
// import Slide6 from"@/public/images/Slide6.jpg";
// import Slide9 from"@/public/images/Slide9.jpeg";
import slide15 from "@/public/images/slide15.png";

export default function Slider() {
  return (
      <Swiper className="xl:h-[100vh] lg:h-[60vh] md:h-[40vh] h-[30vh]" modules={[Navigation, Autoplay]} navigation={true} style={{zIndex: 0}}
      loop={true} autoplay={{delay: 7000, disableOnInteraction: false}}>
        <SwiperSlide>
          <Image src={slide15} fill={true} />
        </SwiperSlide>
        {/* <SwiperSlide>
          <Image src={Slide6} fill={true} />
        </SwiperSlide> */}
        <SwiperSlide>
          <Image src={Slide1} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide12} fill={true} />
        </SwiperSlide>
      </Swiper>
  );
}
