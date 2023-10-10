import Image from "next/image"
import email from "@/public/logos/email.svg"
import phone from "@/public/logos/phone.svg"
import link from "@/public/logos/link.svg"
import address from "@/public/logos/address.svg"
import instagram from "@/public/logos/instagram.svg"
import whatsapp from "@/public/logos/whatsapp.svg"

const Pagination = () => {
  return (
    <div className="flex flex-row-reverse koodak py-12 px-12 gap-5 text-right justify-between bg-slate-900">
        <div className="flex flex-col items-end">
          <h2 className="text-3xl text-white titr underline underline-offset-[0.9rem] mb-10">شرکت پرتو جی شید (سهامی خاص)</h2>
          <div className="lg:w-[25rem] flex flex-row justify-center items-start gap-2">
            <h3 className="text-lg text-white">اصفهان، چهارباغ بالا، کوچه بیستون(12)، 
              خیابان دکتر شریعتی، پلاک 124 ساختمان الماس، طبقه سوم واحد 12</h3>
            <Image src={address} width={20} alt="address logo" unoptimized />
          </div>
          <div className="flex flex-row-reverse gap-8 mt-10">
            <div className="flex flex-col gap-2 text-lg text-white border-white border-l-2 pl-8">
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>09010669227</h5>
                <Image src={phone} width={20} alt="phone logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>09909090999</h5>
                <Image src={phone} width={20} alt="phone logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5 className="font-sans">info@jshid.com</h5>
                <Image src={email} width={20} alt="phone logo" unoptimized />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-lg text-white">
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>لینک های مرتبط</h5>
                <Image src={link} width={20} alt="link logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>لینک های مرتبط</h5>
                <Image src={link} width={20} alt="link logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>لینک های مرتبط</h5>
                <Image src={link} width={20} alt="link logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>لینک های مرتبط</h5>
                <Image src={link} width={20} alt="link logo" unoptimized />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 mt-[10px]">
                <button type="button" className="border-none flex flex-row justify-center gap-2 items-center py-3 px-5 font-sans" id="instagram">
                  <Image className="flex" src={instagram} width={24} />
                  <a className="flex" href="#">
                    Instagram
                  </a>
                </button>
                <button type="button" className="border-none flex flex-row justify-center gap-2 items-center py-3 px-5 font-sans" id="whatsapp">
                  <Image className="flex" src={whatsapp} width={24} />
                  <a className="flex" href="#">
                    Whatsapp
                  </a>
                </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1375.0500542923319!2d51.66216259501566!3d32.62799382677744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1692269303420!5m2!1sfa!2s" width="300" height="300" style={{'border': 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default Pagination