'use client'
import Slider from "@/components/Slider";
import About from "@/components/About";
import Stat from "@/components/Stat";
import Services from "@/components/Services";
import Loj from "@/components/Loj";
import Licenses from "@/components/Licenses";
import Pagination from "@/components/Pagination";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";

export default function Home() {
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
    <main>
      <Nav type={'transparent'} lenis={lenis} />
      <Slider />
      <About />
      <Stat />
      <Services />
      <Loj />
      <Licenses />
    </main>
    <footer>
      <Pagination />
      <Footer />
    </footer>
    </>
  );
}
