"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Slide1 from'@/public/images/Slide1.jpg';
import Slide2 from'@/public/images/Slide2.jpg';
import Slide3 from'@/public/images/Slide3.jpg';
import Slide4 from'@/public/images/Slide4.jpg';
import Slide6 from'@/public/images/Slide6.jpg';

export default function Slider() {
  return (
    <>
      <Swiper className='h-[90vh]'>
        <SwiperSlide>
          <Image src={Slide6} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide1} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide2} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide3} fill={true} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Slide4} fill={true} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
