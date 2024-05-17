import Image from "next/image";
import email from "@/public/logos/email.svg";
import phone from "@/public/logos/phone.svg";
// import link from "@/public/logos/link.svg";
import address from "@/public/logos/address.svg";
import instagram from "@/public/logos/instagram.svg";
import whatsapp from "@/public/logos/whatsapp.svg";
import telephone from "@/public/logos/telephone.svg";

const Pagination = () => {
  return (
    <div id="contact" className="flex md:flex-row-reverse flex-col koodak py-12 px-12 gap-10 text-right justify-between bg-slate-900">
        <div className="flex flex-col items-end">
          <h2 className="md:text-3xl text-2xl text-white yekanb underline underline-offset-[0.9rem] mb-10">شرکت پرتو جی شید (سهامی خاص)</h2>
          <div className="lg:w-[25rem] flex flex-row justify-center items-start gap-2">
            <h3 className="yekanb md:text-lg text-base text-white">اصفهان، چهارباغ بالا، کوچه بیستون(12)، 
              خیابان دکتر شریعتی، پلاک 124 ساختمان الماس، طبقه سوم واحد 12</h3>
            <Image src={address} width={20} alt="address logo" unoptimized />
          </div>
          <div className="flex md:flex-row-reverse flex-col md:gap-8 gap-4 md:mt-10 mt-5 yekanb">
            <div className="flex flex-col gap-2 text-lg text-white md:border-white md:border-l-2 pl-8">
            <div className="flex flex-row justify-end items-center gap-2">
                <h5>09013682870</h5>
                <Image src={phone} width={20} alt="phone logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5>03136286668</h5>
                <Image src={telephone} width={20} alt="phone logo" unoptimized />
              </div>
              <div className="flex flex-row justify-end items-center gap-2">
                <h5 className="font-sans">pjs_civil@gmail.com</h5>
                <Image src={email} width={20} alt="phone logo" unoptimized />
              </div>
            </div>
            <div className="flex md:flex-col flex-row justify-center items-center gap-4 mt-[10px]">
                <button type="button" className="border-none flex flex-row justify-center gap-2 items-center py-3 px-5 font-sans" id="instagram">
                  <Image className="flex" src={instagram} width={24} />
                  <a className="flex" href="https://www.instagram.com/lodge_co/">
                    Instagram
                  </a>
                </button>
                {/* <button type="button" className="border-none flex flex-row justify-center gap-2 items-center py-3 px-5 font-sans" id="whatsapp">
                  <Image className="flex" src={whatsapp} width={24} />
                  <a className="flex" href="#">
                    Whatsapp
                  </a>
                </button> */}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d6720.405482381656!2d51.66085300000001!3d32.627424!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDM3JzM4LjciTiA1McKwMzknMzkuMSJF!5e0!3m2!1sfa!2sde!4v1698729065136!5m2!1sfa!2sde" width="300" height="300" style={{border: '0px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  );
}

export default Pagination;