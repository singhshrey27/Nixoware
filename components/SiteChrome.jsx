import Brand from './Brand';
import SocialLinks from './SocialLinks';
import { MobileNavigation } from './Interactive';
import { whatsappUrl } from '../lib/contact';
import { serviceCatalog } from '../lib/service-catalog';

export function SiteArrow({ external = false }) {
  return <svg className="studio-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d={external ? 'M6 18 18 6M7 6h11v11' : 'M5 12h13m-5-5 5 5-5 5'}/></svg>;
}

export function SiteHeader({ home = false }) {
  return <header className={`site-header ${home ? 'home-header' : 'seo-header'} services-studio-header unified-header`} id="top"><Brand/><MobileNavigation/><a className="header-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Connect on WhatsApp <SiteArrow/></a></header>;
}

export function SiteFooter() {
  return <footer className="studio-footer unified-footer"><div className="studio-container"><div className="studio-footer-brand"><Brand footer/><p>Websites, apps, and software<br/>for growing businesses in India.</p><a className="footer-email" href="mailto:nixoware@gmail.com">nixoware@gmail.com</a><SocialLinks compact/></div><nav aria-label="Services"><h2>Services</h2>{serviceCatalog.map(service => <a key={service.href} href={service.href}>{service.title}</a>)}</nav><nav aria-label="Company"><h2>Company</h2><a href="/">Home</a><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/case-studies">Case Studies</a><a href="/about">About</a><a href="/blog">Insights</a><a href="/contact">Contact</a></nav><small>© 2026 Nixoware. All rights reserved.</small></div></footer>;
}
