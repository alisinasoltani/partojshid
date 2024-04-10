// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Sarv01 from '@/public/images/lodge/Sarv/Sarv01.jpg';
import Sarv02 from '@/public/images/lodge/Sarv/Sarv02.jpg';
import Sarv03 from '@/public/images/lodge/Sarv/Sarv03.jpg';
import Sarv04 from '@/public/images/lodge/Sarv/Sarv04.jpg';
import Sarv05 from '@/public/images/lodge/Sarv/Sarv05.jpg';
import Sarv06 from '@/public/images/lodge/Sarv/Sarv06.jpg';
import Sarv07 from '@/public/images/lodge/Sarv/Sarv07.jpg';
import Sarv08 from '@/public/images/lodge/Sarv/Sarv08.jpg';
import Sarv09 from '@/public/images/lodge/Sarv/Sarv09.jpg';
import Sarv10 from '@/public/images/lodge/Sarv/Sarv10.jpg';
import Sarv11 from '@/public/images/lodge/Sarv/Sarv11.jpg';
import Sarv12 from '@/public/images/lodge/Sarv/Sarv12.jpg';
import Sarv13 from '@/public/images/lodge/Sarv/Sarv13.jpg';
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function SwiperGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[18rem]">
        <SwiperSlide><Image src={Sarv01} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv02} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv03} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv04} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv05} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv06} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv07} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv08} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv09} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv10} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv11} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv12} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv13} fill alt='Sarv Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
