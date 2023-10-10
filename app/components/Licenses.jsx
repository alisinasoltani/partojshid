"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from "swiper/modules"
import Image from "next/image"
import slide1 from "@/public/images/hse-dejdis.com_.png"
import slide2 from "@/public/images/idso9001-dejdis.com_.png"
import slide3 from "@/public/images/iso9003-dejdis.com_.png"
import slide4 from "@/public/images/iso14001-dejdis.com_.png"
import slide5 from "@/public/images/iso22000-dejdis.com_.png"
const Licenses = () => {
  return (
    <div className="bg-[#303E6D] pt-6">
        <div className="titr text-3xl text-white font-semibold text-center">
            <h2>گواهینامه ها</h2>
        </div>
        <div className="bg-[#303E6D] w-full py-2">
            <Swiper slidesPerView={5} modules={[Navigation, Autoplay]}  navigation={true} spaceBetween={30} loop={true} autoplay={{delay: 3000, disableOnInteraction: true}}>
                <SwiperSlide className='pt-4'>
                    <Image src={slide1} width={250} alt="HSE License" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className='pt-4'>
                        <Image src={slide2} width={250} alt="ISO 9001 License" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide3} width={250} alt="ISO 9003 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide4}  width={250} alt="ISO 14001 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide5}  width={250} alt="ISO 22000 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide1} width={250} alt="HSE License" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className='pt-4'>
                        <Image src={slide2} width={250} alt="ISO 9001 License" />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide3} width={250} alt="ISO 9003 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide4}  width={250} alt="ISO 14001 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide5}  width={250} alt="ISO 22000 License" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default Licenses