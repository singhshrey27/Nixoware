import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter, SiteArrow } from '../../../components/SiteChrome';
import { articles, articleSlugs } from '../../../lib/articles';
import AppCostCalculator from '../../../components/AppCostCalculator';
import ClientProof from '../../../components/ClientProof';
import Image from 'next/image';
import { whatsappUrl } from '../../../lib/contact';

const formatArticleDate = date => new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export function generateStaticParams() {
  return articleSlugs.map(article => ({ article }));
}

export async function generateMetadata({ params }) {
  const { article: slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  const url = `/blog/${slug}`;
  const imageUrl = article.featuredImage || '/banners/blog.webp';
  const image = {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: `${article.title} — Nixoware Insights`,
  };
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url, languages: { 'en-IN': url } },
    openGraph: { title: article.title, description: article.description, url, type: 'article', siteName: 'Nixoware', locale: 'en_IN', publishedTime: article.published, modifiedTime: article.modified || article.published, authors: ['Nixoware'], images: [image] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: [imageUrl] }
  };
}

function relatedArticles(slug) {
  const linkedSlugs = (articles[slug].contentLinks || []).map(([, href]) => href.startsWith('/blog/') ? href.slice('/blog/'.length) : null).filter(articleSlug => articleSlug && articleSlug !== slug && articles[articleSlug]);
  return [...new Set([...linkedSlugs, ...articleSlugs.filter(articleSlug => articleSlug !== slug)])].slice(0, 3).map(articleSlug => ({ slug: articleSlug, ...articles[articleSlug] }));
}

export default async function ArticlePage({ params }) {
  const { article: slug } = await params;
  const article = articles[slug];
  if (!article) notFound();
  const related = relatedArticles(slug);
  const canonical = `https://www.nixoware.com/blog/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: article.title, description: article.description, keywords: article.keywords?.join(', '), articleSection: article.sections.map(([heading]) => heading), inLanguage: 'en-IN', datePublished: article.published, dateModified: article.modified || article.published, mainEntityOfPage: canonical, image: `https://www.nixoware.com${article.featuredImage || '/banners/blog.webp'}`, author: article.author ? { '@type': 'Person', name: article.author.name, jobTitle: article.author.role, worksFor: { '@type': 'Organization', name: article.author.company }, url: `https://www.nixoware.com${article.author.profile}` } : { '@type': 'Organization', name: 'Nixoware', url: 'https://www.nixoware.com/' }, publisher: { '@type': 'Organization', name: 'Nixoware', url: 'https://www.nixoware.com/', logo: { '@type': 'ImageObject', url: 'https://www.nixoware.com/icon.svg' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nixoware.com/' }, { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.nixoware.com/blog' }, { '@type': 'ListItem', position: 3, name: article.title, item: canonical }] },
      ...(article.faqs?.length ? [{ '@type': 'FAQPage', mainEntity: article.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }] : [])
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <SiteHeader/>
    <main className="article-main">
      <article>
        <header className="article-header"><a href="/blog">NIXOWARE INSIGHTS</a><h1>{article.title}</h1><p>{article.intro}</p><div><time dateTime={article.published}>{formatArticleDate(article.published)}</time><span>{article.readingTime}</span>{article.modified ? <span>Updated <time dateTime={article.modified}>{formatArticleDate(article.modified)}</time></span> : null}</div>{article.author ? <div className="article-author"><span>Written by <a href={article.author.profile}>{article.author.name}</a></span><span>{article.author.role} / {article.author.company}</span></div> : null}<figure className="article-featured-image"><Image src={article.featuredImage || '/banners/blog.webp'} alt={`${article.title} — Nixoware Insights`} width={1200} height={630} priority sizes="(max-width: 980px) 100vw, 45vw" /></figure></header>
        <div className="article-body">
          {article.estimatePrompt && article.serviceLink ? <p><strong>{article.estimatePrompt}</strong>{' '}<a href={article.serviceLink.href}>{article.serviceLink.label} <SiteArrow/></a></p> : null}
          {article.sections.length > 5 ? <nav aria-label="Article contents"><h2>In this guide</h2><ol>{article.costTable ? <li><a href="#article-cost-table-title">Planning cost ranges</a></li> : null}{article.checklist ? <li><a href="#article-checklist-title">{article.checklist.title}</a></li> : null}{article.sections.map(([heading], index) => <li key={heading}><a href={`#section-${index + 1}`}>{heading}</a></li>)}</ol></nav> : null}
          {article.checklist ? <section className="article-checklist" aria-labelledby="article-checklist-title"><h2 id="article-checklist-title">{article.checklist.title}</h2><ul>{article.checklist.items.map(item => <li key={item}>{item}</li>)}</ul></section> : null}
          {article.costTable ? <section className="article-cost-table" aria-labelledby="article-cost-table-title"><h2 id="article-cost-table-title">{article.costTable.title}</h2><p>{article.costTable.intro}</p><div className="article-table-scroll" role="region" aria-label={article.costTable.title}><table><thead><tr>{article.costTable.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{article.costTable.rows.map(([scope, range, includes]) => <tr key={scope}><th scope="row">{scope}</th><td data-label={article.costTable.headers[1]}>{range}</td><td data-label={article.costTable.headers[2]}>{includes}</td></tr>)}</tbody></table></div><p className="article-table-note">{article.costTable.note}</p></section> : null}
          {article.sections.map(([heading, paragraphs], index) => <section key={heading} id={`section-${index + 1}`}><h2>{heading}</h2>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          {article.sources?.length ? <section aria-labelledby="article-sources"><h2 id="article-sources">Sources and further reading</h2><ul>{article.sources.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></section> : null}
        </div>
        {slug === 'mobile-app-development-cost-guide' ? <AppCostCalculator /> : null}
        {article.author ? <section className="article-author-bio" aria-labelledby="article-author-title"><p>ABOUT THE AUTHOR</p><h2 id="article-author-title">{article.author.name}</h2><p>{article.author.name} is a {article.author.role.toLowerCase()} at {article.author.company}, helping teams plan and build practical software products, mobile applications and digital experiences.</p><a href={article.author.profile}>View author profile <SiteArrow/></a></section> : null}
        {article.contentLinks?.length ? <nav className="article-content-links" aria-label="Relevant Nixoware services and resources"><p>RELEVANT NIXOWARE RESOURCES</p><div>{article.contentLinks.map(([label, href, description]) => <a href={href} key={href}><strong>{label}</strong><span>{description}</span><b aria-hidden="true">→</b></a>)}</div></nav> : null}
        {article.faqs?.length ? <section className="article-faq" aria-labelledby="article-faq-title"><p>FREQUENTLY ASKED QUESTIONS</p><h2 id="article-faq-title">Questions about {article.title.toLowerCase()}</h2>{article.faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</section> : null}
        <nav className="article-related" aria-label="Related insights"><p>MORE NIXOWARE INSIGHTS</p><div>{related.map(relatedArticle => <a href={`/blog/${relatedArticle.slug}`} key={relatedArticle.slug}><span className="article-related-image"><Image src={relatedArticle.featuredImage || '/banners/blog.webp'} alt="" fill sizes="(max-width: 700px) 100vw, 33vw"/></span><strong>{relatedArticle.title}</strong><span>{relatedArticle.description}</span></a>)}</div></nav>
        <nav className="article-next-steps" aria-label="Continue with Nixoware"><p>CONTINUE WITH NIXOWARE</p><div><a href={article.serviceLink?.href || '/services'}><strong>{article.serviceLink?.label || 'Explore Nixoware services'}</strong><span>Find the right capability for your website, software, or digital project.</span><b aria-hidden="true">→</b></a><a href="/case-studies"><strong>See our case studies</strong><span>Explore the thinking and delivery behind selected digital projects.</span><b aria-hidden="true">→</b></a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><strong>Connect on WhatsApp</strong><span>Share your goal and get a practical next step from our team.</span><b aria-hidden="true">→</b></a></div></nav>
        <aside className="article-cta"><p>Planning a digital project?</p><h2>Turn the next decision into a practical roadmap.</h2><a className="button primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Connect on WhatsApp <SiteArrow/></a></aside>
      </article>
      <ClientProof/>
    </main>
    <SiteFooter/>
  </>;
}
