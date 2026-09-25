import { seoSlugs } from '../lib/seo-pages';
import { articleSlugs } from '../lib/articles';

export default function sitemap() {
  const lastModified = new Date('2026-09-25');
  return [
    { url: 'https://nixoware.com/', lastModified, changeFrequency: 'weekly', priority: 1, images: ['https://nixoware.com/web-development-hero.png'] },
    ...seoSlugs.map(slug => ({
      url: `https://nixoware.com/${slug}`,
      lastModified,
      changeFrequency: slug === 'blog' ? 'weekly' : 'monthly',
      priority: ['services', 'web-development', 'software-development', 'contact'].includes(slug) ? 0.9 : 0.8,
      images: [`https://nixoware.com/banners/${slug}.webp`]
    })),
    ...articleSlugs.map(slug => ({
      url: `https://nixoware.com/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
      images: ['https://nixoware.com/banners/blog.webp']
    }))
  ];
}
