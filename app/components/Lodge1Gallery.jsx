// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Lodge03 from '@/public/images/lodge/Lodge1/03.jpg';
import Lodge04 from '@/public/images/lodge/Lodge1/04.jpg';
import Lodge05 from '@/public/images/lodge/Lodge1/05.jpg';
import Lodge06 from '@/public/images/lodge/Lodge1/06.jpg';
import Lodge08 from '@/public/images/lodge/Lodge1/08.jpg';
import Lodge19 from '@/public/images/lodge/Lodge1/19.jpg';
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Lodge1Gallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[70vw]">
        <SwiperSlide><Image src={Lodge03} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Lodge04} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Lodge05} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Lodge06} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Lodge08} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={Lodge19} fill alt='Sarv Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
