import { notFound } from 'next/navigation';
import Brand from '../../../components/Brand';
import { MobileNavigation } from '../../../components/Interactive';
import { articles, articleSlugs } from '../../../lib/articles';

export function generateStaticParams() {
  return articleSlugs.map(article => ({ article }));
}

export async function generateMetadata({ params }) {
  const { article: slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  const url = `/blog/${slug}`;
  const image = {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: `${article.title} — Nixoware Insights`,
  };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url, languages: { 'en-IN': url } },
    openGraph: { title: article.title, description: article.description, url, type: 'article', siteName: 'Nixoware', locale: 'en_IN', publishedTime: article.published, modifiedTime: article.published, authors: ['Nixoware'], images: [image] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: ['/opengraph-image'] }
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
      { '@type': 'Article', headline: article.title, description: article.description, datePublished: article.published, dateModified: article.published, mainEntityOfPage: canonical, image: 'https://nixoware.com/opengraph-image', author: { '@type': 'Organization', name: 'Nixoware', url: 'https://nixoware.com/' }, publisher: { '@type': 'Organization', name: 'Nixoware', url: 'https://nixoware.com/', logo: { '@type': 'ImageObject', url: 'https://nixoware.com/icon.svg' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nixoware.com/' }, { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://nixoware.com/blog' }, { '@type': 'ListItem', position: 3, name: article.title, item: canonical }] }
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="site-header seo-header"><Brand/><MobileNavigation/><a className="header-cta" href="/contact">Start a conversation <span aria-hidden="true">→</span></a></header>
    <main className="article-main">
      <article>
        <header className="article-header"><a href="/blog">NIXOWARE INSIGHTS</a><h1>{article.title}</h1><p>{article.intro}</p><div><time dateTime={article.published}>{new Date(`${article.published}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time><span>{article.readingTime}</span></div></header>
        <div className="article-body">{article.sections.map(([heading, paragraphs]) => <section key={heading}><h2>{heading}</h2>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
        <nav className="article-related" aria-label="Related insights"><p>MORE NIXOWARE INSIGHTS</p><div>{related.map(relatedArticle => <a href={`/blog/${relatedArticle.slug}`} key={relatedArticle.slug}><strong>{relatedArticle.title}</strong><span>{relatedArticle.description}</span></a>)}</div></nav>
        <aside className="article-cta"><p>Planning a digital project?</p><h2>Turn the next decision into a practical roadmap.</h2><a className="button primary" href="/contact">Talk with Nixoware <span aria-hidden="true">→</span></a></aside>
      </article>
    </main>
    <footer className="seo-footer"><div><Brand footer/><p>Websites, software products, and cloud platforms engineered for meaningful progress.</p></div><nav aria-label="Explore"><h2>Explore</h2><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/blog">Insights</a><a href="/contact">Contact</a></nav><small>© 2026 Nixoware. All rights reserved.</small></footer>
  </>;
}
