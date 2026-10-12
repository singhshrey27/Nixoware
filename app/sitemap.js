import { seoSlugs } from '../lib/seo-pages';
import { articles, articleSlugs } from '../lib/articles';
import { portfolioSlugs } from '../lib/portfolio';
import { pageBanners } from '../lib/page-banners';

export default function sitemap() {
  const lastModified = new Date('2026-09-26');
  return [
    { url: 'https://www.nixoware.com/', lastModified: new Date('2026-10-12'), changeFrequency: 'weekly', priority: 1, images: ['https://www.nixoware.com/homepage-hero-v2.webp'] },
    ...seoSlugs.map(slug => ({
      url: `https://www.nixoware.com/${slug}`,
      lastModified: ['services', 'web-development', 'software-development'].includes(slug) ? new Date('2026-10-12') : lastModified,
      changeFrequency: slug === 'blog' ? 'weekly' : 'monthly',
      priority: ['services', 'web-development', 'software-development', 'contact'].includes(slug) ? 0.9 : 0.8,
      images: [`https://www.nixoware.com${pageBanners[slug].src}`]
    })),
    ...articleSlugs.map(slug => ({
      url: `https://www.nixoware.com/blog/${slug}`,
      lastModified: new Date(articles[slug].modified || articles[slug].published),
      changeFrequency: 'monthly',
      priority: 0.75,
      images: [`https://www.nixoware.com${articles[slug].featuredImage || '/banners/blog.webp'}`]
    })),
    ...portfolioSlugs.map(slug => ({
      url: `https://www.nixoware.com/portfolio/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`https://www.nixoware.com${slug === 'pune-education-forum-website' ? '/pune-education-forum-website.webp' : '/teknolab-website.webp'}`]
    }))
  ];
}
