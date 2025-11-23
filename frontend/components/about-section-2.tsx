'use client'

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 shrink-0">{icons[type]}</div>;
};


// Prop types for the HeroSection component
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction?: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo?: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {

    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden md:flex-row-reverse",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >

        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between md:w-1/2 lg:w-3/5">
          <div className="flex flex-row-reverse items-center justify-start gap-4">
            <div className="h-1 w-16 bg-[#5E55FF] rounded-l-full"></div>
            <h2 className="irsans_bold text-3xl text-black">
              درباره ما
            </h2>
            {/* The purple divider line */}
          </div>
          {/* Top Section: Logo & Main Content */}
          <div>
            <motion.main variants={containerVariants} style={{ direction: 'rtl' }} className='px-8 pt-0 pb-16 md:px-12 md:pt-0 md:pb-24 lg:px-16 lg:pt-0 lg:pb-32 '>
              {/* <motion.h1 className='text-right' variants={itemVariants}>
                {title}
              </motion.h1> */}
              <motion.div className="mt-6 h-1 w-20 bg-primary" variants={itemVariants}></motion.div>
              <motion.p className="mb-8 max-w-md lg:max-w-lg text-base text-muted-foreground irsans_med" variants={itemVariants}>
                {subtitle}
              </motion.p>
              <motion.p className='mb-2 irsans_reg'>
                +20 سال فعالیت حرفه ای
              </motion.p>
              <motion.p className='irsans_reg'>
                +12 پروژه عمرانی تحویل شده با ارزش بیش 100 از میلیارد ریال در سطح کشور و استان اصفهان
              </motion.p>
            </motion.main>
          </div>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5 p-8 md:p-12 lg:p-16"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ clipPath: 'polygon(0% 0, 0% 0, 0% 100%, 0% 100%)' }}
          animate={{ clipPath: 'polygon(0% 0, 75% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
