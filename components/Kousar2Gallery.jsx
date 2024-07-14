import { Swiper, SwiperSlide } from 'swiper/react';
import kousar1 from '@/public/images/projects/kousar2/kousar_1.jpg';
// import kousar2 from '@/public/images/projects/kousar2/kousar_2.jpg';
import kousar3 from '@/public/images/projects/kousar2/kousar_2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function Kousar2Gallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={kousar1} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        {/* <SwiperSlide><Image src={kousar2} fill alt='Kousar 2 Project Picture' /></SwiperSlide> */}
        <SwiperSlide><Image src={kousar3} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
