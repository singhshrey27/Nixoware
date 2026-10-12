import Image from 'next/image';
import { SiteHeader, SiteFooter, SiteArrow } from './SiteChrome';
import ClientProof from './ClientProof';
import { cardMedia } from '../lib/page-media';
import { portfolioProjects, portfolioSlugs } from '../lib/portfolio';
import { pageBanners } from '../lib/page-banners';
import { articles, articleSlugs, featuredArticleSlugs } from '../lib/articles';
import { whatsappUrl } from '../lib/contact';
import ServicesPage from './ServicesPage';

const serviceLinks = [
  ['Web development', '/web-development'], ['Website maintenance', '/website-maintenance'], ['Mobile apps', '/mobile-app-development'],
  ['Custom software', '/software-development'], ['Ecommerce', '/ecommerce-development'],
  ['UI/UX design', '/ui-ux-design'], ['Cloud solutions', '/cloud-solutions'],
  ['Digital marketing', '/digital-marketing']
];
const serviceSlugs = new Set(['web-development', 'website-maintenance', 'mobile-app-development', 'software-development', 'ecommerce-development', 'ui-ux-design', 'cloud-solutions', 'digital-marketing']);

function Arrow() { return <SiteArrow/>; }

export default function SeoPage({ page, slug }) {
  if (slug === 'services') return <ServicesPage page={page}/>;
  const canonical = `https://www.nixoware.com/${slug}`;
  const banner = pageBanners[slug];
  const isService = serviceSlugs.has(slug);
  const faqs = page.faqs || (isService ? [
    [`What does your ${page.label.toLowerCase()} service include?`, `The scope is shaped around your goals and can include discovery, planning, design, implementation, testing, launch, and ongoing improvement.`],
    ['How do you estimate project cost and timeline?', 'We review the required outcomes, users, features, integrations, technical constraints, and delivery risks before recommending a scope, timeline, and commercial approach.'],
    ['Can Nixoware support the product after launch?', 'Yes. Support can include monitoring, maintenance, content or feature updates, performance improvements, and a prioritized roadmap for future releases.']
  ] : []);
  const isProjectIndex = slug === 'portfolio' || slug === 'case-studies';
  const pageCards = slug === 'blog'
    ? [...featuredArticleSlugs, ...articleSlugs.filter(articleSlug => !featuredArticleSlugs.includes(articleSlug))]
      .map(articleSlug => [articles[articleSlug].title, articles[articleSlug].description, `/blog/${articleSlug}`, articles[articleSlug].featuredImage])
    : isProjectIndex
      ? portfolioSlugs.map(projectSlug => { const project = portfolioProjects[projectSlug]; return [project.client, project.description, `/portfolio/${projectSlug}`, project.image, `${project.client} website preview`]; })
      : page.cards?.map(([title, text, href], index) => {
        const contactHref = slug === 'contact' ? (title === 'Phone' ? 'tel:+919650429575' : title === 'Email' ? 'mailto:nixoware@gmail.com' : href) : href;
        const media = cardMedia(slug, title, href, index);
        return [title, text, contactHref === '/contact' ? whatsappUrl : contactHref, media.src, media.alt];
      });
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${canonical}#webpage`, name: page.title, description: page.description, url: canonical, inLanguage: 'en-IN', primaryImageOfPage: { '@type': 'ImageObject', url: `https://www.nixoware.com${banner.src}` }, isPartOf: { '@id': 'https://www.nixoware.com/#website' }, about: { '@id': 'https://www.nixoware.com/#organization' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nixoware.com/' }, { '@type': 'ListItem', position: 2, name: page.label, item: canonical }] },
     ...(isService ? [{ '@type': 'Service', name: page.title, serviceType: page.label, description: page.description, url: canonical, provider: { '@id': 'https://www.nixoware.com/#organization' }, areaServed: { '@type': 'Country', name: 'India' } }] : []),
     ...(faqs.length ? [{ '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }] : [])
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <SiteHeader/>
    <main className={`seo-main${slug === 'blog' ? ' blog-index' : ''}`}>
      <section className="seo-hero reference-hero"><div className="seo-hero-inner"><h1>{banner.lines.map((line, index) => <span key={line} className={index === banner.lines.length - 1 ? 'banner-accent' : undefined}>{line}</span>)}</h1><p>{banner.description}</p><div className="seo-actions"><a className="button primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Connect on WhatsApp <Arrow/></a><a href={page.cards ? '#page-offerings' : '/services'}>{page.cards ? 'Explore this page' : 'Explore our services'} <Arrow/></a></div></div><div className="page-hero-visual"><Image src={banner.src} alt={banner.alt} fill priority unoptimized sizes="(max-width: 980px) 100vw, 56vw"/></div></section>
      <ClientProof/>
      {pageCards ? <section className="seo-card-section" aria-labelledby="page-offerings"><div className="seo-section-heading"><p className="seo-eyebrow">{slug === 'blog' ? 'NIXOWARE INSIGHTS' : isProjectIndex ? 'SELECTED WORK' : 'WHAT WE COVER'}</p><h2 id="page-offerings">{slug === 'blog' ? 'Practical guides. Better decisions.' : isProjectIndex ? 'Real work. Clear thinking.' : 'Focused capabilities and experience.'}</h2></div><div className="seo-cards">{pageCards.map(([title, text, href, image, alt], index) => <article key={title} className={slug === 'blog' || isProjectIndex ? 'editorial-card' : undefined}>{slug === 'blog' || isProjectIndex ? <a className="seo-card-image-link" href={href} aria-label={`Read ${title}`}><Image className="seo-card-image" src={image || '/banners/blog.webp'} alt={alt || ''} width={1200} height={750} sizes={slug === 'blog' ? '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw' : '(max-width: 700px) 100vw, 50vw'}/></a> : <div className="page-card-media"><Image src={image} alt={alt || ''} fill sizes="(max-width: 700px) 70vw, 40vw"/></div>}<h3>{title}</h3><p>{text}</p>{href ? <a href={href} target={href.startsWith('https://wa.me/') ? '_blank' : undefined} rel={href.startsWith('https://wa.me/') ? 'noopener noreferrer' : undefined}>{isProjectIndex ? 'Read project story' : 'Learn more'} <Arrow/></a> : null}</article>)}</div></section> : null}
      <section className="seo-content-section"><div className="seo-section-heading"><div><p className="seo-eyebrow">OUR APPROACH</p><h2>Clear decisions. Maintainable outcomes.</h2></div><div className="approach-visual"><Image src={slug === 'website-maintenance' ? '/services/maintenance.webp' : banner.src} alt="" fill sizes="(max-width: 700px) 100vw, 50vw"/></div></div><div className="seo-content-grid">{page.sections.map(([title, text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></section>
      {faqs.length ? <section className="seo-card-section seo-faq" aria-labelledby="faq-title"><div className="seo-section-heading"><p className="seo-eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2 id="faq-title">Questions about {page.label.toLowerCase()}.</h2></div><div className="seo-faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div></section> : null}
      <section className="seo-related"><div><p className="seo-eyebrow">NEXT STEP</p><h2>Continue exploring Nixoware.</h2></div><div>{page.links.map(([label, href]) => <a key={label} href={href === '/contact' ? whatsappUrl : href} target={href === '/contact' ? '_blank' : undefined} rel={href === '/contact' ? 'noopener noreferrer' : undefined}>{href === '/contact' ? 'Connect on WhatsApp' : label} <Arrow/></a>)}</div></section>
    </main>
    <SiteFooter/>
  </>;
}
