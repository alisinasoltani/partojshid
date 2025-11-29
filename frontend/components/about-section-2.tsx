'use client'

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';


// Prop types for the HeroSection component
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  subtitle: string[];
  image: string;
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, title, subtitle, description, image, ...props }, ref) => {

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
              {title}
            </h2>
            {/* The purple divider line */}
          </div>
          {/* Top Section: Logo & Main Content */}
          <div>
            <motion.main variants={containerVariants} style={{ direction: 'rtl' }} className='px-8 pt-0 pb-16 md:px-12 md:pt-0 md:pb-24 lg:px-16 lg:pt-0 lg:pb-32 '>
              <motion.div className="mt-6 h-1 w-20 bg-primary" variants={itemVariants}></motion.div>
              <motion.p className="mb-8 max-w-md lg:max-w-lg text-base text-muted-foreground irsans_med" variants={itemVariants}>
                {description}
              </motion.p>
              {subtitle.map((sub) => (
                <motion.p className='mb-2 irsans_reg'>
                  {sub}
                </motion.p>
              ))}
            </motion.main>
          </div>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5 p-8 md:p-12 lg:p-16"
          style={{
            backgroundImage: `url(${image})`,
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
