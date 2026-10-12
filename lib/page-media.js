import { portfolioProjects } from './portfolio';

// Real project previews are used only for the organizations they document.
export function cardMedia(slug, title, href, index = 0) {
  const project = href?.startsWith('/portfolio/') ? portfolioProjects[href.slice('/portfolio/'.length)] : null;
  if (project) return { src: project.image, alt: `${project.client} website preview` };
  const topic = title.toLowerCase();
  if (/corporate|responsive/.test(topic)) return { src: '/visuals/v2/website.webp', alt: '' };
  if (/custom website|next\.js|cms/.test(topic)) return { src: '/visuals/v2/software.webp', alt: '' };
  if (/redesign/.test(topic)) return { src: '/visuals/v2/design.webp', alt: '' };
  const categories = [
    [/maintenance|support|backup|security|reliability|monitor/, 'maintenance'],
    [/mobile|android|ios|cross-platform/, 'mobile'],
    [/ecommerce|e-commerce|checkout|payment|store|catalogue/, 'ecommerce'],
    [/design|ux|prototype|wireframe|research/, 'design'],
    [/cloud|devops|infrastructure|migration|governance/, 'cloud'],
    [/seo|search|marketing|content|campaign|measurement/, 'marketing'],
    [/software|application|api|integrat|dashboard|portal|workflow|backend/, 'software'],
    [/website|frontend|business/, 'website'],
  ];
  for (const [pattern, name] of categories) if (pattern.test(topic)) return { src: `/visuals/v2/${name}.webp`, alt: '' };
  const fallback = { about: ['design', 'software', 'website', 'cloud'], contact: ['website', 'design', 'software', 'maintenance'], 'case-studies': ['website', 'software', 'cloud'], 'cloud-solutions': ['cloud'], 'digital-marketing': ['marketing'], 'ui-ux-design': ['design'], 'mobile-app-development': ['mobile'], 'website-maintenance': ['maintenance'], 'ecommerce-development': ['ecommerce'] };
  const images = fallback[slug] || ['website', 'software', 'design'];
  return { src: `/visuals/v2/${images[index % images.length]}.webp`, alt: '' };
}
