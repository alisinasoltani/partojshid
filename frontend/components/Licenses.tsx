"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";

type Certificate = {
    id: string;
    title: string;
    logo: string;
};

interface CertificateCardProps {
    certificate: Certificate;
}

interface Input {
    title: String;
    certificates: Certificate[];
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
    return (
        // This is the "liquid glass" / glassmorphism effect
        <div className="flex items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            {/* Title */}
            <h3 className="irsans_med text-base text-white">
                {certificate.title}
            </h3>
            {/* Placeholder Logo */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                <Image width={96} height={96} className="rounded-full" src={`/images/${certificate.logo}`} alt={certificate.title} />
            </div>
        </div>
    );
};

const Licenses = ({ input }: { input: Input }) => {
    return (
        <section
            dir="rtl"
            className="w-full overflow-hidden bg-[#050730] pt-32"
            style={{
                clipPath: "polygon(0 15%, 25% 25%, 75% 25%, 100% 15%, 100% 100%, 0 100%)",
            }}>
            <div className="mx-auto max-w-7xl md:mx-0 md:w-full md:max-w-none py-24 sm:px-6 lg:px-0 lg:pt-40 flex flex-col items-start">
                {/* Section Header */}
                <div className="mb-10 flex flex-row items-center justify-start gap-4">
                    <div className="h-1 w-16 bg-[#5E55FF] rounded-l-full"></div>
                    <h2 className="irsans_med text-3xl text-white">
                        {input.title}
                    </h2>
                </div>

                {/* Swiper Slider */}
                <div className="w-full px-4 md:px-12 flex justify-center mx-auto">
                    <Swiper
                        loop={true}
                        spaceBetween={16}
                        slidesPerView={1.2}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        className="w-full flex justify-center mx-auto"
                    >
                        {input.certificates.map((cert) => (
                            <SwiperSlide key={cert.id}>
                                <CertificateCard certificate={cert} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Licenses;