import { notFound } from 'next/navigation';
import SeoPage from '../../components/SeoPage';
import { seoPages, seoSlugs } from '../../lib/seo-pages';
import { pageBanners } from '../../lib/page-banners';

export function generateStaticParams() { return seoSlugs.map(slug => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = seoPages[slug];
  if (!page) return {};
  const banner = pageBanners[slug];
  const images = [{ url: banner.src, alt: banner.alt }];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: `${page.title} | Nixoware`, description: page.description, url: `/${slug}`, type: 'website', siteName: 'Nixoware', images },
    twitter: { card: 'summary_large_image', title: `${page.title} | Nixoware`, description: page.description, images: [banner.src] }
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = seoPages[slug];
  if (!page) notFound();
  return <SeoPage page={page} slug={slug}/>;
}
