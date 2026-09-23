import '../src/style.css';
import '../src/refinements.css';
import '../src/contact-polish.css';
import '../src/footer-fix.css';
import '../src/sections-refresh.css';
import '../src/seo-pages.css';
import '../src/services-page.css';
import '../src/reference-banners.css';
import '../src/articles.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://nixoware.com'),
  applicationName: 'Nixoware',
  title: { default: 'NIXOWARE | Website, Mobile App & Maintenance Services', template: '%s | NIXOWARE' },
  description: 'NIXOWARE designs, develops, and maintains responsive websites, mobile apps, e-commerce stores, and custom web applications for startups and growing businesses.',
  authors: [{ name: 'Nixoware', url: 'https://nixoware.com' }],
  creator: 'Nixoware',
  publisher: 'Nixoware',
  category: 'technology',
  openGraph: {
    title: 'Website, Mobile App & Maintenance Services | Nixoware',
    description: 'Build and maintain high-quality websites, mobile apps, e-commerce stores, and custom web applications with Nixoware.',
    url: '/',
    siteName: 'Nixoware',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Nixoware website, mobile app, and maintenance services' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website, Mobile App & Maintenance Services | Nixoware',
    description: 'Website development, mobile app development, and ongoing website maintenance for growing businesses.',
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
  }
};

export default function RootLayout({ children }) {
  return <html lang="en">
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
