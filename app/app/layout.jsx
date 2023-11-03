import './globals.css';

export const metadata = {
  title: 'Parto Jshid',
  description: 'شرکت مهندسی پرتو جی شید با بیش از 20 سال سابقه و با نیت خدمت و کمک به عمران و آبادانی کشور و با بکارگیری پرسنل مجرب و توانمند در زمینه پروژه های عمرانی با موضوع ابنیه ، تاسیسات ، راه و ترابری و آب و فاضلاب مشغول به فعالیت می باشد و در راستای اجرای سیستم مدیریت یکپارچه (IMS) و همچنین سیستم مدیریت کیفیت پروژه ISO 10006 اهداف خود را به ثمر می رساند .',
  author: 'Alisina Soltani',
  keywords: 'شرکت مهندسی پرتو جی شید پرتو جی شید پروژه های عمرانی ابنیه تاسیسات راه و ترابری آب و فاضلاب',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
