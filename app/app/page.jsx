import Slider from "@/components/Slider"
import About from "@/components/About"
import Stat from "@/components/Stat"
import Services from "@/components/Services"
import Loj from "@/components/Loj"
import Licenses from "@/components/Licenses"
import Pagination from "@/components/Pagination"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
    <main className="">
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
  )
}
