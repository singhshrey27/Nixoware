import Image from './VisualImage';
import ClientProof from './ClientProof';
import { SiteHeader, SiteFooter } from './SiteChrome';
import { whatsappUrl } from '../lib/contact';
import { serviceCatalog, serviceDeliverySteps } from '../lib/service-catalog';

function Arrow({ circle = false }) {
  return <svg className={circle ? 'studio-arrow studio-arrow-circle' : 'studio-arrow'} viewBox="0 0 24 24" aria-hidden="true">{circle ? <circle cx="12" cy="12" r="10.5"/> : null}<path d="M5 12h13m-5-5 5 5-5 5"/></svg>;
}

function ServiceCard({ service, index }) {
  return <article className="studio-service-card">
    <a href={service.href} aria-label={`Explore ${service.title}`}>
      <div className="studio-service-photo"><Image src={service.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw"/></div>
      <div className="studio-service-copy"><span className="studio-service-rule" aria-hidden="true"/><span className="studio-service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.description}</p><span className="studio-service-link">Explore service <Arrow/></span></div>
    </a>
  </article>;
}

export default function ServicesPage({ page }) {
  const canonical = 'https://www.nixoware.com/services';
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${canonical}#webpage`, name: page.title, description: page.description, url: canonical, inLanguage: 'en-IN', isPartOf: { '@id': 'https://www.nixoware.com/#website' }, about: { '@id': 'https://www.nixoware.com/#organization' }, mainEntity: { '@id': `${canonical}#services` } },
    { '@type': 'ItemList', '@id': `${canonical}#services`, itemListElement: serviceCatalog.map((service, index) => ({ '@type': 'ListItem', position: index + 1, name: service.title, url: `https://www.nixoware.com${service.href}` })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nixoware.com/' }, { '@type': 'ListItem', position: 2, name: 'Services', item: canonical }] },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <SiteHeader/>
    <main className="seo-main services-studio">
      <section className="studio-hero" aria-labelledby="studio-hero-title">
        <div className="studio-hero-photo"><Image src="/visuals/v2/services.webp" alt="Illustrative website, mobile app and software interfaces on a laptop, smartphone and tablet in a teal studio" fill priority sizes="(max-width: 850px) 100vw, 70vw"/></div>
        <div className="studio-container"><div className="studio-hero-copy"><h1 id="studio-hero-title">Your next idea.<span>Our next build.</span></h1><p>Websites, mobile apps, and custom software for Indian businesses. Built with clarity. Supported beyond launch.</p><div className="studio-hero-actions"><a className="studio-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Discuss your project</a><a className="studio-explore" href="#page-offerings">Explore services <Arrow circle/></a></div><a className="studio-work-link" href="/portfolio">See our work <Arrow/></a></div></div>
      </section>
      <section className="studio-catalog" aria-labelledby="page-offerings" id="service-catalog">
        <div className="studio-container"><div className="studio-catalog-heading"><h2 id="page-offerings">The right technology. Real business value.</h2><p>Explore what we can build, improve, and support for your team.</p></div><div className="studio-service-grid">{serviceCatalog.map((service, index) => <ServiceCard key={service.href} service={service} index={index}/>)}</div></div>
      </section>
      <section className="studio-delivery" aria-labelledby="studio-delivery-title"><div className="studio-container"><div className="studio-delivery-heading"><h2 id="studio-delivery-title">A clear path from idea<br/>to launch.</h2><a href="/portfolio">See our portfolio <Arrow/></a></div><div className="studio-delivery-steps">{serviceDeliverySteps.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
      <section className="studio-conversation" aria-labelledby="studio-conversation-title"><div className="studio-container"><div><h2 id="studio-conversation-title">Have a project in mind?</h2><p>Tell us what you want to build, improve, or maintain.<br/>We will help you find a practical starting point.</p></div><div className="studio-conversation-actions"><a className="studio-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Connect on WhatsApp <Arrow/></a><a href="/portfolio">View portfolio <Arrow/></a></div></div></section>
      <ClientProof/>
    </main>
    <SiteFooter/>
  </>;
}
