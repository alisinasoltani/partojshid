import { Swiper, SwiperSlide } from 'swiper/react';
import pool1 from '@/public/images/projects/pool/pool_1.jpg';
// import pool2 from '@/public/images/projects/pool/pool_2.jpg';
import pool3 from '@/public/images/projects/pool/pool_3.jpg';
import pool4 from '@/public/images/projects/pool/pool_4.jpg';
import pool5 from '@/public/images/projects/pool/pool_5.jpg';
import pool6 from '@/public/images/projects/pool/pool_6.jpg';
import pool7 from '@/public/images/projects/pool/pool_7.jpg';
import pool8 from '@/public/images/projects/pool/pool_8.jpg';
import pool9 from '@/public/images/projects/pool/pool_9.jpg';
import pool10 from '@/public/images/projects/pool/pool_10.jpg';
import pool11 from '@/public/images/projects/pool/pool_11.jpg';
import pool12 from '@/public/images/projects/pool/pool_12.jpg';
import pool13 from '@/public/images/projects/pool/pool_13.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function PoolGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={pool1} fill alt='Pool Project Picture' /></SwiperSlide>
        {/* <SwiperSlide><Image src={pool2} fill alt='Pool Project Picture' /></SwiperSlide> */}
        <SwiperSlide><Image src={pool4} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool3} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool5} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool6} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool7} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool8} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool9} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool10} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool11} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool12} fill alt='Pool Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={pool13} fill alt='Pool Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
