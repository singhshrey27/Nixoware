import Image from 'next/image';
import Brand from './Brand';
import { pageBanners } from '../lib/page-banners';
import { MobileNavigation } from './Interactive';

const serviceLinks = [
  ['Web development', '/web-development'], ['Mobile apps', '/mobile-app-development'],
  ['Custom software', '/software-development'], ['Ecommerce', '/ecommerce-development'],
  ['UI/UX design', '/ui-ux-design'], ['Cloud solutions', '/cloud-solutions'],
  ['Digital marketing', '/digital-marketing']
];
const serviceSlugs = new Set(['web-development', 'mobile-app-development', 'software-development', 'ecommerce-development', 'ui-ux-design', 'cloud-solutions', 'digital-marketing']);

function Arrow() { return <span aria-hidden="true">→</span>; }

export default function SeoPage({ page, slug }) {
  const canonical = `https://nixoware.com/${slug}`;
  const banner = pageBanners[slug];
  const isService = serviceSlugs.has(slug);
  const faqs = isService ? [
    [`What does your ${page.label.toLowerCase()} service include?`, `The scope is shaped around your goals and can include discovery, planning, design, implementation, testing, launch, and ongoing improvement.`],
    ['How do you estimate project cost and timeline?', 'We review the required outcomes, users, features, integrations, technical constraints, and delivery risks before recommending a scope, timeline, and commercial approach.'],
    ['Can Nixoware support the product after launch?', 'Yes. Support can include monitoring, maintenance, content or feature updates, performance improvements, and a prioritized roadmap for future releases.']
  ] : [];
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', name: page.title, description: page.description, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Nixoware', url: 'https://nixoware.com/' }, about: { '@type': 'Organization', name: 'Nixoware', url: 'https://nixoware.com/' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nixoware.com/' }, { '@type': 'ListItem', position: 2, name: page.label, item: canonical }] },
    ...(isService ? [{ '@type': 'Service', name: page.title, description: page.description, url: canonical, provider: { '@type': 'Organization', name: 'Nixoware', url: 'https://nixoware.com/' }, areaServed: { '@type': 'Country', name: 'India' } }, { '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }] : [])
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="site-header seo-header" id="top"><Brand/><MobileNavigation/><a className="header-cta" href="/contact">Start a conversation <Arrow/></a></header>
    <main className="seo-main">
      <section className="seo-hero reference-hero"><div className="seo-hero-inner"><h1>{banner.lines.map((line, index) => <span key={line} className={index === banner.lines.length - 1 ? 'banner-accent' : undefined}>{line}</span>)}</h1><p>{banner.description}</p><div className="seo-actions"><a className="button primary" href={slug === 'contact' ? 'mailto:nixoware@gmail.com' : '/contact'}>{slug === 'contact' ? 'Email our team' : 'Discuss your project'} <Arrow/></a><a href={page.cards ? '#page-offerings' : '/services'}>{page.cards ? 'Explore this page' : 'Explore our services'} <Arrow/></a></div></div><div className="page-hero-visual"><Image src={banner.src} alt={banner.alt} fill priority sizes="(max-width: 980px) 100vw, 56vw"/></div></section>
      {page.cards ? <section className="seo-card-section" aria-labelledby="page-offerings"><div className="seo-section-heading"><p className="seo-eyebrow">WHAT WE COVER</p><h2 id="page-offerings">Focused capabilities and experience.</h2></div><div className="seo-cards">{page.cards.map(([title, text, href]) => <article key={title}><h3>{title}</h3><p>{text}</p>{href ? <a href={href}>Learn more <Arrow/></a> : null}</article>)}</div></section> : null}
      <section className="seo-content-section"><div className="seo-section-heading"><p className="seo-eyebrow">OUR APPROACH</p><h2>Clear decisions. Maintainable outcomes.</h2></div><div className="seo-content-grid">{page.sections.map(([title, text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></section>
      {isService ? <section className="seo-card-section seo-faq" aria-labelledby="faq-title"><div className="seo-section-heading"><p className="seo-eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2 id="faq-title">Questions about {page.label.toLowerCase()}.</h2></div><div className="seo-content-grid">{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section> : null}
      <section className="seo-related"><div><p className="seo-eyebrow">NEXT STEP</p><h2>Continue exploring Nixoware.</h2></div><div>{page.links.map(([label, href]) => <a key={label} href={href}>{label} <Arrow/></a>)}</div></section>
    </main>
    <footer className="seo-footer"><div><Brand footer/><p>Websites, software products, and cloud platforms engineered for meaningful progress.</p></div><nav aria-label="Services"><h2>Services</h2>{serviceLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><nav aria-label="Company"><h2>Company</h2><a href="/about">About</a><a href="/portfolio">Portfolio</a><a href="/case-studies">Case studies</a><a href="/blog">Insights</a><a href="/contact">Contact</a></nav><small>© 2026 Nixoware. All rights reserved.</small></footer>
  </>;
}
