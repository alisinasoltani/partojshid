import { Swiper, SwiperSlide } from 'swiper/react';
// import baharestan1 from '@/public/images/projects/baharestan/baharestan_1.png';
import baharestan2 from '@/public/images/projects/baharestan/baharestan_2.png';
import baharestan3 from '@/public/images/projects/baharestan/baharestan_3.png';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function BahaarestanGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        {/* <SwiperSlide><Image src={baharestan1} fill alt='Baharestan Project Picture' /></SwiperSlide> */}
        <SwiperSlide><Image src={baharestan2} fill alt='Baharestan Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={baharestan3} fill alt='Baharestan Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}