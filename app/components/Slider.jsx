"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import slide1 from'@/public/images/Golden-Gate-Bridge.jpg'

export default function Slider() {
  return (
    <>
      <Swiper className='h-[90vh]'>
        <SwiperSlide>
          <h3 className='text-3xl text-red-400'>??????????????????????????</h3>
          <Image src={slide1} fill={true} />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
