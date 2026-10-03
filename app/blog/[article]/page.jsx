import { notFound } from 'next/navigation';
import Brand from '../../../components/Brand';
import { MobileNavigation } from '../../../components/Interactive';
import { articles, articleSlugs } from '../../../lib/articles';
import AppCostCalculator from '../../../components/AppCostCalculator';
import Image from 'next/image';

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
  return articleSlugs.filter(articleSlug => articleSlug !== slug).slice(0, 3).map(articleSlug => ({ slug: articleSlug, ...articles[articleSlug] }));
}

export default async function ArticlePage({ params }) {
  const { article: slug } = await params;
  const article = articles[slug];
  if (!article) notFound();
  const related = relatedArticles(slug);
  const canonical = `https://nixoware.com/blog/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: article.title, description: article.description, datePublished: article.published, dateModified: article.modified || article.published, mainEntityOfPage: canonical, image: `https://nixoware.com${article.featuredImage || '/banners/blog.webp'}`, author: article.author ? { '@type': 'Person', name: article.author.name, jobTitle: article.author.role, worksFor: { '@type': 'Organization', name: article.author.company }, url: `https://nixoware.com${article.author.profile}` } : { '@type': 'Organization', name: 'Nixoware', url: 'https://nixoware.com/' }, publisher: { '@type': 'Organization', name: 'Nixoware', url: 'https://nixoware.com/', logo: { '@type': 'ImageObject', url: 'https://nixoware.com/icon.svg' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nixoware.com/' }, { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://nixoware.com/blog' }, { '@type': 'ListItem', position: 3, name: article.title, item: canonical }] },
      ...(article.faqs?.length ? [{ '@type': 'FAQPage', mainEntity: article.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }] : [])
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="site-header seo-header"><Brand/><MobileNavigation/><a className="header-cta" href="/contact">Start a conversation <span aria-hidden="true">→</span></a></header>
    <main className="article-main">
      <article>
        <header className="article-header"><a href="/blog">NIXOWARE INSIGHTS</a><h1>{article.title}</h1><p>{article.intro}</p><div><time dateTime={article.published}>{formatArticleDate(article.published)}</time><span>{article.readingTime}</span>{article.modified ? <span>Updated <time dateTime={article.modified}>{formatArticleDate(article.modified)}</time></span> : null}</div>{article.author ? <div className="article-author"><span>Written by <a href={article.author.profile}>{article.author.name}</a></span><span>{article.author.role} / {article.author.company}</span></div> : null}<figure className="article-featured-image"><Image src={article.featuredImage || '/banners/blog.webp'} alt={`${article.title} — Nixoware Insights`} width={1200} height={630} priority sizes="(max-width: 920px) 100vw, 920px" /></figure></header>
        <div className="article-body">
          {article.sources?.length ? <nav aria-label="Article contents"><h2>In this checklist</h2><ol>{article.sections.map(([heading], index) => <li key={heading}><a href={`#section-${index + 1}`}>{heading}</a></li>)}</ol></nav> : null}
          {article.sections.map(([heading, paragraphs], index) => <section key={heading} id={`section-${index + 1}`}><h2>{heading}</h2>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          {article.sources?.length ? <section aria-labelledby="article-sources"><h2 id="article-sources">Sources and further reading</h2><ul>{article.sources.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></section> : null}
        </div>
        {slug === 'mobile-app-development-cost-guide' ? <AppCostCalculator /> : null}
        {article.author ? <section className="article-author-bio" aria-labelledby="article-author-title"><p>ABOUT THE AUTHOR</p><h2 id="article-author-title">{article.author.name}</h2><p>{article.author.name} is a {article.author.role.toLowerCase()} at {article.author.company}, helping teams plan and build practical software products, mobile applications and digital experiences.</p><a href={article.author.profile}>View author profile <span aria-hidden="true">â†’</span></a></section> : null}
        {article.contentLinks?.length ? <nav className="article-content-links" aria-label="Relevant Nixoware services and resources"><p>RELEVANT NIXOWARE RESOURCES</p><div>{article.contentLinks.map(([label, href, description]) => <a href={href} key={href}><strong>{label}</strong><span>{description}</span><b aria-hidden="true">→</b></a>)}</div></nav> : null}
        {article.faqs?.length ? <section className="article-faq" aria-labelledby="article-faq-title"><p>FREQUENTLY ASKED QUESTIONS</p><h2 id="article-faq-title">Questions about {article.title.toLowerCase()}</h2>{article.faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</section> : null}
        <nav className="article-related" aria-label="Related insights"><p>MORE NIXOWARE INSIGHTS</p><div>{related.map(relatedArticle => <a href={`/blog/${relatedArticle.slug}`} key={relatedArticle.slug}><strong>{relatedArticle.title}</strong><span>{relatedArticle.description}</span></a>)}</div></nav>
        <nav className="article-next-steps" aria-label="Continue with Nixoware"><p>CONTINUE WITH NIXOWARE</p><div><a href={article.serviceLink?.href || '/services'}><strong>{article.serviceLink?.label || 'Explore Nixoware services'}</strong><span>Find the right capability for your website, software, or digital project.</span><b aria-hidden="true">→</b></a><a href="/case-studies"><strong>See our case studies</strong><span>Explore the thinking and delivery behind selected digital projects.</span><b aria-hidden="true">→</b></a><a href="/contact"><strong>Discuss your project</strong><span>Share your goal and get a practical next step from our team.</span><b aria-hidden="true">→</b></a></div></nav>
        <aside className="article-cta"><p>Planning a digital project?</p><h2>Turn the next decision into a practical roadmap.</h2><a className="button primary" href="/contact">Talk with Nixoware <span aria-hidden="true">→</span></a></aside>
      </article>
    </main>
    <footer className="seo-footer"><div><Brand footer/><p>Websites, software products, and cloud platforms engineered for meaningful progress.</p></div><nav aria-label="Explore"><h2>Explore</h2><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/blog">Insights</a><a href="/contact">Contact</a></nav><small>© 2026 Nixoware. All rights reserved.</small></footer>
  </>;
}
