import Slider from "@/components/Slider.jsx"
import About from "@/components/About.jsx"
import Stat from "@/components/Stat.jsx"
import Services from "@/components/Services.jsx"
import Loj from "@/components/Loj.jsx"
import Licenses from "@/components/Licenses.jsx"
import Pagination from "@/components/Pagination.jsx"
import Footer from "@/components/Footer.jsx"

export default function Home() {
  return (
    <>
    <main>
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
