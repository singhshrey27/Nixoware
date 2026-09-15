import '../src/style.css';
import '../src/refinements.css';
import '../src/contact-polish.css';
import '../src/footer-fix.css';
import '../src/sections-refresh.css';

export const metadata = {
  metadataBase: new URL('https://nixoware.com'),
  applicationName: 'Nixoware',
  title: { default: 'Web Development, DevOps & Cloud Services | Nixoware', template: '%s | Nixoware' },
  description: 'Nixoware provides website development, custom software development, product engineering, DevOps consulting, cloud management, AI automation, and digital transformation services.',
  keywords: ['web development company', 'website development services', 'custom software development', 'product engineering services', 'DevOps consulting services', 'cloud management services', 'cloud migration services', 'AI automation services', 'digital transformation consulting', 'web application development'],
  authors: [{ name: 'Nixoware', url: 'https://nixoware.com' }],
  creator: 'Nixoware',
  publisher: 'Nixoware',
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Web Development, DevOps & Cloud Services | Nixoware',
    description: 'Build high-quality websites, digital products, automated delivery pipelines, and dependable cloud platforms with Nixoware.',
    url: '/',
    siteName: 'Nixoware',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Nixoware — websites, digital products, and cloud solutions' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development, DevOps & Cloud Services | Nixoware',
    description: 'Websites, digital products, DevOps, and cloud solutions engineered for growth.',
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
  }
};

export default function RootLayout({ children }) { return <html lang="en"><body>{children}</body></html>; }
