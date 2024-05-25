// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import LodgePresale1 from '@/public/images/lodge/Lodge1/presale1.jpg';
import LodgePresale2 from '@/public/images/lodge/Lodge1/presale2.jpg';
import LodgePresale3 from '@/public/images/lodge/Lodge1/presale3.jpg';
import LodgePresale4 from '@/public/images/lodge/Lodge1/presale4.jpg';
import LodgePresale5 from '@/public/images/lodge/Lodge1/presale5.jpg';
import LodgePresale6 from '@/public/images/lodge/Lodge1/presale6.jpg';
import LodgePresale7 from '@/public/images/lodge/Lodge1/presale7.jpg';
import LodgePresale8 from '@/public/images/lodge/Lodge1/presale8.jpg';
import LodgePresale9 from '@/public/images/lodge/Lodge1/presale9.jpg';
import LodgePresale10 from '@/public/images/lodge/Lodge1/presale10.jpg';
import LodgePresale11 from '@/public/images/lodge/Lodge1/presale11.jpg';
import LodgePresale12 from '@/public/images/lodge/Lodge1/presale12.jpg';
import LodgePresale13 from '@/public/images/lodge/Lodge1/presale13.jpg';
import LodgePresale14 from '@/public/images/lodge/Lodge1/presale14.jpg';
import LodgePresale15 from '@/public/images/lodge/Lodge1/presale15.jpg';
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Lodge1PresaleGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[40vw] w-[40vw]">
        <SwiperSlide><Image src={LodgePresale1} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale2} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale3} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale4} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale5} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale6} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale7} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale8} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale9} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale10} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale11} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale12} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale13} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale14} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={LodgePresale15} fill alt='Lodge 1 Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
