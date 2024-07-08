import { Swiper, SwiperSlide } from 'swiper/react';
import concStruc1 from '@/public/images/projects/concStruc/concStruc_1.jpg';
import concStruc2 from '@/public/images/projects/concStruc/concStruc_2.jpg';
import concStruc3 from '@/public/images/projects/concStruc/concStruc_3.jpg';
import concStruc4 from '@/public/images/projects/concStruc/concStruc_4.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function SaroojGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={concStruc1} fill alt='Sarooj Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={concStruc2} fill alt='Sarooj Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={concStruc3} fill alt='Sarooj Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={concStruc4} fill alt='Sarooj Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
