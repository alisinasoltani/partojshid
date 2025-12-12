import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "پرتو جی شید",
  description: "شرکت مهندسی پرتو جی شید با بیش از 20 سال سابقه و با نیت خدمت و کمک به عمران و آبادانی کشور و با بکارگیری پرسنل مجرب و توانمند در زمینه پروژه های عمرانی با موضوع ابنیه ، تاسیسات ، راه و ترابری و آب و فاضلاب مشغول به فعالیت می باشد و در راستای اجرای سیستم مدیریت یکپارچه (IMS) و همچنین سیستم مدیریت کیفیت پروژه ISO 10006 اهداف خود را به ثمر می رساند .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
