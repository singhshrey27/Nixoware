import { seoSlugs } from '../lib/seo-pages';
import { articles, articleSlugs } from '../lib/articles';
import { portfolioSlugs } from '../lib/portfolio';

export default function sitemap() {
  const lastModified = new Date('2026-09-26');
  return [
    { url: 'https://www.nixoware.com/', lastModified, changeFrequency: 'weekly', priority: 1, images: ['https://www.nixoware.com/web-development-hero.webp'] },
    ...seoSlugs.map(slug => ({
      url: `https://nixoware.com/${slug}`,
      lastModified,
      changeFrequency: slug === 'blog' ? 'weekly' : 'monthly',
      priority: ['services', 'web-development', 'software-development', 'contact'].includes(slug) ? 0.9 : 0.8,
      images: [`https://nixoware.com/banners/${slug}.webp`]
    })),
    ...articleSlugs.map(slug => ({
      url: `https://nixoware.com/blog/${slug}`,
      lastModified: new Date(articles[slug].modified || articles[slug].published),
      changeFrequency: 'monthly',
      priority: 0.75,
      images: ['https://nixoware.com/banners/blog.webp']
    })),
    ...portfolioSlugs.map(slug => ({
      url: `https://nixoware.com/portfolio/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`https://nixoware.com${slug === 'pune-education-forum-website' ? '/pune-education-forum-website.webp' : '/teknolab-website.webp'}`]
    }))
  ];
}
