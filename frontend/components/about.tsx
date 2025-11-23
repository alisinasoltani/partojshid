import React from 'react';
import { HeroSection } from '@/components/about-section-2'; // Adjust the import path as needed

export default function HeroSectionDemo() {
  return (
    <div className="w-full pt-12">
      
      <HeroSection
        logo={{
          url: "https://vucvdpamtrjkzmubwlts.supabase.co/storage/v1/object/public/users/user_2zMtrqo9RMaaIn4f8F2z3oeY497/avatar.png",
          alt: "Company Logo",
          text: "Your Logo"
        }}
        slogan="ELEVATE YOUR PERSPECTIVE"
        title={
          <>

          </>
        }
        subtitle={
          "شرکت مهندسی پرتو جی شید با بیش از 20 سال سابقه و با نیت خدمت و کمک به عمران و آبادانی کشور و با بکارگیری پرسنل مجرب و توانمند در زمینه پروژه های عمرانی با موضوع ابنیه ، تاسیسات ، راه و ترابری و آب و فاضلاب مشغول به فعالیت می باشد و در راستای اجرای سیستم مدیریت یکپارچه (IMS) و همچنین سیستم مدیریت کیفیت پروژه ISO 10006 اهداف خود را به ثمر می رساند ."
        }
        // callToAction={{
        //   text: "JOIN US TO EXPLORE",
        //   href: "#explore",
        // }}
        backgroundImage="/images/ejlas.jpg"
      // contactInfo={{
      //   website: "yourwebsite.com",
      //   phone: "+1 (555) 123-4567",
      //   address: "20 Fieldstone Dr, Roswell, GA",
      // }}
      />
    </div>
  );
}
