const servicePaths = new Set([
  '/services', '/web-development', '/mobile-app-development', '/software-development',
  '/website-maintenance', '/ecommerce-development', '/ui-ux-design',
  '/cloud-solutions', '/digital-marketing',
]);

export function trackEvent(name, parameters = {}) {
  if (typeof window === 'undefined') return;
  try {
    const pagePath = window.location.pathname;
    const eventParameters = {
      ...parameters,
      page_path: pagePath,
      content_group: pagePath.startsWith('/blog/') ? 'article' : servicePaths.has(pagePath) ? 'service' : 'other',
    };
    window.dataLayer = window.dataLayer || [];
    // Queue events when the existing GA script has not initialised yet.
    const send = typeof window.gtag === 'function' ? window.gtag : function () { window.dataLayer.push(arguments); };
    send('event', name, eventParameters);
  } catch {
    // Analytics failure must not interrupt navigation or enquiry confirmation.
  }
}

export function trackLinkClick(anchor) {
  const href = anchor.getAttribute('href');
  if (!href) return;
  let destination;
  try {
    destination = new URL(href, window.location.href);
  } catch {
    return;
  }
  const method = destination.protocol === 'tel:' ? 'phone'
    : destination.protocol === 'mailto:' ? 'email'
    : destination.protocol === 'https:' && ['wa.me', 'api.whatsapp.com'].includes(destination.hostname) ? 'whatsapp'
    : null;
  const placement = anchor.closest('header') ? 'header'
    : anchor.closest('footer') ? 'footer'
    : anchor.closest('.article-main') ? 'article' : 'page';
  if (method) {
    // Do not send link URLs, phone numbers, emails, query strings, or messages.
    trackEvent('contact_click', { contact_method: method, placement });
    return;
  }
  const internal = destination.origin === window.location.origin
    || ['www.nixoware.com', 'nixoware.com'].includes(destination.hostname);
  const destinationPath = destination.pathname.replace(/\/$/, '') || '/';
  if (internal && servicePaths.has(destinationPath)) {
    trackEvent('service_click', { destination_path: destinationPath, placement });
  }
}
