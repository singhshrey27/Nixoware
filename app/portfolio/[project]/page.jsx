import Image from 'next/image';
import { whatsappUrl } from '../../../lib/contact';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter, SiteArrow } from '../../../components/SiteChrome';
import ClientProof from '../../../components/ClientProof';
import { portfolioProjects, portfolioSlugs } from '../../../lib/portfolio';

export function generateStaticParams() {
  return portfolioSlugs.map(project => ({ project }));
}

export async function generateMetadata({ params }) {
  const { project: slug } = await params;
  const project = portfolioProjects[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/portfolio/${slug}`, languages: { 'en-IN': `/portfolio/${slug}` } },
    openGraph: { title: project.title, description: project.description, url: `/portfolio/${slug}`, type: 'article', siteName: 'Nixoware', locale: 'en_IN', images: [{ url: project.image, alt: project.title }] },
    twitter: { card: 'summary_large_image', title: project.title, description: project.description, images: [project.image] }
  };
}

function List({ items }) {
  return <ul className="portfolio-detail-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export default async function PortfolioProjectPage({ params }) {
  const { project: slug } = await params;
  const project = portfolioProjects[slug];
  if (!project) notFound();
  const canonical = `https://www.nixoware.com/portfolio/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: project.title, description: project.description, mainEntityOfPage: canonical, image: `https://www.nixoware.com${project.image}`, author: { '@type': 'Organization', name: 'Nixoware', url: 'https://www.nixoware.com/' }, publisher: { '@type': 'Organization', name: 'Nixoware', url: 'https://www.nixoware.com/' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nixoware.com/' }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.nixoware.com/portfolio' }, { '@type': 'ListItem', position: 3, name: project.title, item: canonical }] }
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <SiteHeader/>
    <main className="portfolio-detail-main">
      <article className="portfolio-detail">
        <header className="portfolio-detail-hero"><p className="seo-eyebrow">NIXOWARE PORTFOLIO / {project.industry.toUpperCase()}</p><h1>{project.title}</h1><p>{project.description}</p><a className="button primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live website <SiteArrow/></a></header>
        <figure className="portfolio-detail-image"><Image src={project.image} alt={`${project.client} website preview`} width={1440} height={900} priority unoptimized sizes="(max-width: 900px) 100vw, 920px"/><figcaption>{project.client} website preview</figcaption></figure>
        <div className="portfolio-detail-grid"><section><p className="section-label">THE CLIENT</p><h2>{project.client}</h2><p>{project.industry}</p></section><section><p className="section-label">THE PROBLEM</p><h2>Making the right information easier to find.</h2><p>{project.problem}</p></section><section><p className="section-label">OBJECTIVES</p><h2>A focused digital foundation.</h2><List items={project.objectives}/></section><section><p className="section-label">THE SOLUTION</p><h2>From audience questions to clear journeys.</h2><p>{project.solution}</p></section><section><p className="section-label">TECHNOLOGY</p><h2>Built for clarity and ownership.</h2><p>{project.technology}</p></section><section><p className="section-label">FEATURES</p><h2>What the experience includes.</h2><List items={project.features}/></section><section><p className="section-label">DEVELOPMENT PROCESS</p><h2>Discover, structure, design, build, improve.</h2><List items={project.process}/></section><section><p className="section-label">OUTCOME</p><h2>Useful progress the organization can build on.</h2><p>{project.outcome}</p></section></div>
        <section className="portfolio-detail-cta"><p className="section-label">NEXT PROJECT</p><h2>Need a website that explains your value clearly?</h2><div><a className="button primary" href={project.relatedService[0]}>{project.relatedService[1]} <SiteArrow/></a>{project.relatedLinks.map(([label, href]) => <a className="text-link" href={href} key={href}>{label} <SiteArrow/></a>)}</div></section>
      </article>
      <ClientProof/>
    </main>
    <SiteFooter/>
  </>;
}
