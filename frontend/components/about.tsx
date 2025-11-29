import React from 'react';
import { HeroSection } from '@/components/about-section-2'; // Adjust the import path as needed

interface Input {
  title: string;
  description: string;
  subitle: string[];
  image: string;
}

export default function HeroSectionDemo({ input }: { input: Input }) {
  return (
    <div className="w-full pt-12">

      <HeroSection
        title={input.title}
        description={input.description}
        subtitle={input.subitle}
        // callToAction={{
        //   text: "JOIN US TO EXPLORE",
        //   href: "#explore",
        // }}
        image={input.image}
      // contactInfo={{
      //   website: "yourwebsite.com",
      //   phone: "+1 (555) 123-4567",
      //   address: "20 Fieldstone Dr, Roswell, GA",
      // }}
      />
    </div>
  );
}
