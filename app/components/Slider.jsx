"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from "swiper/modules";
// import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Slide1 from'@/public/images/Slide1.jpg';
import Slide2 from'@/public/images/Slide2.jpg';
import Slide6 from'@/public/images/Slide6.jpg';

export default function Slider() {
  return (
      <Swiper className='h-[100vh]' modules={[Navigation, Autoplay]} navigation={true} style={{zIndex: 0}}
      loop={true} autoplay={{delay: 3000, disableOnInteraction: true}}>
        <SwiperSlide>
          <Image src={Slide6} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide1} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide2} fill={true} />
        </SwiperSlide>
      </Swiper>
  );
}
