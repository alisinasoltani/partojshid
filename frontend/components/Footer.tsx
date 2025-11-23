import { MapPin, Smartphone, Phone, Mail, Instagram } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import whatsappQRCode from "@/public/images/whatsapp.jpg";

export const Footer = () => {
  return (
    <div className="bg-[#050730] text-white p-8 md:p-12 irsans_reg" dir="rtl">
      {/* Component Title */}
      <h1 className="text-3xl irsans_med text-right mb-10 text-gray-100">
        شرکت پرتو جی شید (سهامی خاص)
      </h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

        {/* === Column 1: Contact Info === */}
        <div className="flex flex-col border-0 md:border-l-2 border-[#5E55FF] pl-2" id="contact">
          <h2 className="text-2xl irsans_med mb-5 inline-block">
            تماس با ما
          </h2>
          <ul className="space-y-4 text-gray-200">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-white mt-1 shrink-0" aria-label="آدرس" />
              <span>
                خیابان چهارباغ بالا شریعتی شرقی رو به روی بانک آینده ساختمان الماس طبقه ۳ واحد ۱۲
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-white shrink-0" aria-label="موبایل" />
              <span>09013682870</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-white shrink-0" aria-label="تلفن" />
              <span>03136286668</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white shrink-0" aria-label="ایمیل" />
              <span>pjs.civil@gmail.com</span>
            </li>
          </ul>

          {/* Instagram Button */}
          <div className='flex gap-2'>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="md:max-w-36 mt-6 inline-flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-5 py-2.5 rounded-lg font-medium transition-transform hover:scale-105 sm:w-auto"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5 flex justify-center items-center pb-0.5" />
              <span className='text-[14px] flex justify-center items-center h-full'>Instagram</span>
            </a>
            <Dialog>
              <DialogTrigger asChild>
                {/* This is your original link, converted to a button to trigger the modal */}
                <button
                  className="md:max-w-36 cursor-pointer mt-6 inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#25D366] via-[#128c7e] to-[#075e74] text-white px-5 py-2.5 rounded-lg font-medium transition-transform hover:scale-105 sm:w-auto"
                >
                  <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5 flex justify-center items-center pb-0.5" />
                  <span className='text-[14px] flex justify-center items-center h-full'>Whatsapp</span>
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px] bg-white">
                <DialogHeader>
                  <DialogTitle>Whatsapp QR Code</DialogTitle>
                </DialogHeader>

                {/* The image you requested inside the modal */}
                <div className="mt-4">
                  <Image
                    src={whatsappQRCode}
                    alt="Jeyshid Whatsapp"
                    width={500}
                    className="rounded-md object-cover w-full"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <a
              href="https://t.me/Pjs_co"
              target="_blank"
              rel="noopener noreferrer"
              className="md:max-w-36 mt-6 inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#37AFE2] to-[#1B92D1] text-white px-5 py-2.5 rounded-lg font-medium transition-transform hover:scale-105 sm:w-auto"
            >
              <FaTelegram className="w-4 h-4 md:w-5 md:h-5 flex justify-center items-center pb-0.5" />
              <span className='text-[14px] flex justify-center items-center h-full'>Telegram</span>
            </a>
          </div>
        </div>

        {/* === Column 2: Projects === */}
        <div>
          <h2 className="text-2xl irsans_med mb-5 inline-block">
            پروژه ها
          </h2>
          <ul className="space-y-3 text-gray-200 irsans_light">
            <li>&nbsp;تکمیل فضای کنکورس</li>
            <li>&nbsp;زمین ورزشی غرب</li>
            <li>&nbsp;کوثر 2</li>
            <li>&nbsp;بهارستان</li>
            <li>مجموعه فرهنگی حسین آباد</li>
            <li>استخر دانشگاه علوم پزشکی</li>
            <li>ساختمان آموزش مرات پولاد</li>
            <li>احداث سوله انبار گلتاش</li>
            <li>اجرای ساختمان نظام مهندسی شاهین شهر</li>
            <li>سازه های بتنی مخازن مازوت سیمان ساروج</li>
          </ul>
        </div>

        <div className="w-fit h-fit place-content-center place-self-center-safe rounded-lg overflow-hidden shadow-lg">
          <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d6720.405482381656!2d51.66085300000001!3d32.627424!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDM3JzM4LjciTiA1McKwMzknMzkuMSJF!5e0!3m2!1sfa!2sde!4v1698729065136!5m2!1sfa!2sde" width="300" height="300" style={{ border: '0px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};