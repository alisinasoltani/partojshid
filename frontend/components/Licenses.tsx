"use client"; // This component needs to be a Client Component for Swiper

import React from "react";
// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// import { Loop } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

// --- Type Definitions ---
type Certificate = {
    id: string;
    title: string;
    logo: string; // Using a simple string for the logo text
};

// --- Mock Data ---
// You can replace these with your actual data
const certificateData: Certificate[] = [
    { id: "1", title: "ISO 9003:2018", logo: "iao-9001.png" },
    { id: "2", title: "ISO 9003:2018", logo: "iso-9003.png" },
    { id: "3", title: "ISO 9003:2018", logo: "iso-14001.png" },
    { id: "4", title: "ISO 9003:2018", logo: "iso-22000.png" },
    { id: "5", title: "ISO 9003:2018", logo: "iao-9001.png" },
    { id: "6", title: "ISO 9003:2018", logo: "iso-9003.png" },
];

// --- Single Certificate Card Component ---
interface CertificateCardProps {
    certificate: Certificate;
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

// --- Main Slider Component ---
const Licenses: React.FC = () => {
    return (
        <section
            dir="rtl"
            // Main background color
            className="w-full overflow-hidden bg-[#050730] pt-32"
            // This clip-path creates the exact top shape from the image
            style={{
                clipPath: "polygon(0 15%, 25% 25%, 75% 25%, 100% 15%, 100% 100%, 0 100%)",
            }}
        >
            {/* We use padding to push content below the clipped area */}
            <div className="mx-auto max-w-7xl md:mx-0 md:w-full md:max-w-none py-24 sm:px-6 lg:px-0 lg:pt-40 flex flex-col items-start">
                {/* Section Header */}
                <div className="mb-10 flex flex-row items-center justify-start gap-4">
                    <div className="h-1 w-16 bg-[#5E55FF] rounded-l-full"></div>
                    <h2 className="irsans_med text-3xl text-white">
                        گواهینامه ها
                    </h2>
                    {/* The purple divider line */}
                </div>

                {/* Swiper Slider */}
                <div className="w-full px-4 md:px-12 flex justify-center mx-auto">
                    <Swiper
                        loop={true}
                        spaceBetween={16}
                        // Responsive breakpoints
                        slidesPerView={1.2} // 1 full item + part of the next on mobile
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 2.2,
                                spaceBetween: 20,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        className="w-full flex justify-center mx-auto"
                    >
                        {certificateData.map((cert) => (
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