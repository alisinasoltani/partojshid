"use client"
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import LodgeNav from '@/components/LodgeNav';
import LodgeSlider from "@/components/LodgeSlider";
import LodgeLicenses from "@/components/LodgeLicenses";
import LodgeProjects from "@/components/LodgeProjects";
import LodgePagination from "@/components/LodgePagination";
import LodgeAbout from "@/components/LodgeAbout";
import SwiperGallery from "@/components/SwiperGallery";

const Lodge = () => {
    const [lenis, setLenis] = useState();
    useEffect(() => {
      const lenis = new Lenis();
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      setLenis(lenis);
    }, []);
  return (
    <>
    <LodgeNav type={'solid'} lenis={lenis} />
    <LodgeSlider />
    <LodgeAbout />
    <LodgeProjects />
    <div>page</div>
    <LodgeLicenses />
    <LodgePagination />
    </>
  )
}

export default Lodge