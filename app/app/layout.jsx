import './globals.css';
import Head from 'next/head';

export const metadata = {
  title: 'Parto Jshid',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/public/logos/jeyshidLogo.png" />  
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
