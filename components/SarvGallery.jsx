import { Swiper, SwiperSlide } from 'swiper/react';
import Sarv01 from '@/public/images/lodge/Sarv/1.jpg';
import Sarv02 from '@/public/images/lodge/Sarv/2.jpg';
import Sarv03 from '@/public/images/lodge/Sarv/3.jpg';
import Sarv04 from '@/public/images/lodge/Sarv/4.jpg';
import Sarv05 from '@/public/images/lodge/Sarv/5.jpg';
import Sarv06 from '@/public/images/lodge/Sarv/6.jpg';
import Sarv07 from '@/public/images/lodge/Sarv/7.jpg';
import Sarv08 from '@/public/images/lodge/Sarv/8.jpg';
import Sarv09 from '@/public/images/lodge/Sarv/9.jpg';
import Sarv11 from '@/public/images/lodge/Sarv/11.jpg';
import Sarv12 from '@/public/images/lodge/Sarv/12.jpg';
import Sarv13 from '@/public/images/lodge/Sarv/13.jpg';
import Sarv14 from '@/public/images/lodge/Sarv/14.jpg';
import Sarv15 from '@/public/images/lodge/Sarv/15.jpg';
import Sarv16 from '@/public/images/lodge/Sarv/16.jpg';
import Sarv17 from '@/public/images/lodge/Sarv/17.jpg';
import Image from "next/image";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SarvGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper  lg:h-[30vw] h-[78vw] lg:w-[30vw] w-[78vw]">
        <SwiperSlide><Image src={Sarv01} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv02} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv03} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv04} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv05} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv06} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv07} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv08} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv09} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv11} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv12} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv13} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv14} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv15} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv16} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Sarv17} fill alt='Sarv Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
