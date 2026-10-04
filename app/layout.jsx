import '../src/style.css';
import '../src/refinements.css';
import '../src/contact-polish.css';
import '../src/footer-fix.css';
import '../src/sections-refresh.css';
import '../src/seo-pages.css';
import '../src/services-page.css';
import '../src/reference-banners.css';
import '../src/articles.css';
import '../src/article-featured.css';
import '../src/light-banner.css';
import '../src/blog-cards.css';
import '../src/blog-redesign.css';
import '../src/portfolio.css';
import '../src/theme-refresh.css';
import '../src/typography.css';
import Script from 'next/script';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata = {
  metadataBase: new URL('https://www.nixoware.com'),
  applicationName: 'Nixoware',
  title: { default: 'Web & Mobile App Development Company in India | Nixoware', template: '%s | Nixoware' },
  description: 'Nixoware is a web and mobile app development company in India building fast websites, e-commerce stores, custom software, and reliable digital products.',
  authors: [{ name: 'Nixoware', url: 'https://www.nixoware.com' }],
  creator: 'Nixoware',
  publisher: 'Nixoware',
  category: 'technology',
  alternates: { languages: { 'en-IN': '/' } },
  verification: { google: '804feecc45c29f8d' },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: 'Web & Mobile App Development Company in India | Nixoware',
    description: 'Nixoware builds fast websites, mobile apps, e-commerce stores, and custom software for growing businesses in India.',
    url: '/',
    siteName: 'Nixoware',
    locale: 'en_IN',
    countryName: 'India',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Nixoware website, mobile app, and maintenance services' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development & Mobile App Development Company | Nixoware',
    description: 'Website development, mobile app development, e-commerce, custom web development, and website maintenance services for growing businesses.',
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
  }
};

export default function RootLayout({ children }) {
  return <html lang="en" className={manrope.variable}>
    <body>{children}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JWK5CJKD5N" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JWK5CJKD5N');
      ` }} />
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="BTzW/IDMIe2lnAaC9mUgSg"
        strategy="lazyOnload"
      />
    </body>
  </html>;
}
