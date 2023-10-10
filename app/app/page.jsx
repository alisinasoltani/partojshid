import Stat from "@/components/Stat"
import Services from "@/components/Services"
import Licenses from "@/components/Licenses"
import Pagination from "@/components/Pagination"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
    <main className="">
      <Stat />
      <Services />
      <Licenses />
    </main>
    <footer>
      <Pagination />
      <Footer />
    </footer>
    </>
  )
}
