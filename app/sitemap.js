import { seoSlugs } from '../lib/seo-pages';

export default function sitemap() {
  const lastModified = new Date('2026-09-15');
  return [
    { url: 'https://nixoware.com/', lastModified, changeFrequency: 'weekly', priority: 1 },
    ...seoSlugs.map(slug => ({
      url: `https://nixoware.com/${slug}`,
      lastModified,
      changeFrequency: slug === 'blog' ? 'weekly' : 'monthly',
      priority: ['services', 'web-development', 'software-development', 'contact'].includes(slug) ? 0.9 : 0.8
    }))
  ];
}
