import Image from 'next/image';
import Brand from '../components/Brand';
import { ContactForm, MobileNavigation } from '../components/Interactive';

export const metadata = { alternates: { canonical: '/', languages: { 'en-IN': '/' } } };

const capabilities = [
  { number: '01', title: 'Website Development', text: 'Fast, responsive business websites designed to turn visitors into customers.', href: '/web-development', icon: 'bars' },
  { number: '02', title: 'Mobile App Development', text: 'Reliable Android, iOS, and cross-platform apps built around your users.', href: '/mobile-app-development', icon: 'cube' },
  { number: '03', title: 'Website Maintenance', text: 'Ongoing updates, security monitoring, backups, and performance improvements.', href: '/website-maintenance', icon: 'spark' },
  { number: '04', title: 'E-commerce Development', text: 'Secure online stores with smooth product, payment, and order experiences.', href: '/ecommerce-development', icon: 'cloud' },
  { number: '05', title: 'Custom Web Applications', text: 'Purpose-built portals, dashboards, and business systems that simplify work.', href: '/software-development', icon: 'cube' },
  { number: '06', title: 'UI/UX Design', text: 'Clear, accessible interfaces that make websites and applications easier to use.', href: '/ui-ux-design', icon: 'spark' },
];
const serviceDetails = {
  '01': 'Business websites, landing pages, redesigns, CMS development, and search-friendly implementation.',
  '02': 'Android and iOS apps, cross-platform development, API integrations, testing, launch, and upgrades.',
  '03': 'Content changes, bug fixes, software updates, backups, uptime checks, security, and speed optimization.',
  '04': 'Product catalogues, payment gateways, order management, customer accounts, and store maintenance.',
  '05': 'Customer portals, internal tools, dashboards, API development, integrations, and workflow automation.',
  '06': 'User research, wireframes, interactive prototypes, design systems, and responsive interface design.',
};
const clients = [
  { name: 'Pune Education Forum', category: 'Education & Events', url: 'https://puneeducationforum.in/', portfolio: '/portfolio/pune-education-forum-website', domain: 'puneeducationforum.in', image: '/pune-education-forum-website.png', description: 'A leadership forum for conversations shaping the future of learning.', outcome: 'A responsive event and leadership platform that makes the forum, speakers, sessions, partners, and participation path easier to explore.' },
  { name: 'Teknolab', category: 'Product Testing & Quality', url: 'https://teknolab.in/', portfolio: '/portfolio/teknolab-website', domain: 'teknolab.in', image: '/teknolab-website.png', description: 'Independent testing for electronics, IT, lighting, and electrical products.', outcome: 'A service-led website that makes complex testing capabilities clearer and gives prospective customers a direct route to enquiry.' },
];
const steps = [
  { number: '01', title: 'Discover', text: 'Understand your goals, audience, requirements, budget, and priorities.' },
  { number: '02', title: 'Plan & design', text: 'Define the scope, user experience, technology, timeline, and project roadmap.' },
  { number: '03', title: 'Build & test', text: 'Develop the solution and test its usability, performance, and compatibility.' },
  { number: '04', title: 'Launch & support', text: 'Deploy with care, monitor performance, and provide ongoing improvements.' },
];

function Arrow() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4"/></svg>; }
function CapabilityIcon({ type }) {
  if (type === 'cloud') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 25h15a6 6 0 0 0 1-12 9 9 0 0 0-17-2A7 7 0 0 0 9 25Z"/></svg>;
  if (type === 'cube') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m16 3 11 6v13l-11 7-11-7V9l11-6Zm0 0v13m11-7-11 7L5 9m11 7v13"/></svg>;
  if (type === 'spark') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0-7v4m0 18v4M3 16h4m18 0h4M7 7l3 3m12 12 3 3M25 7l-3 3M10 22l-3 3"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27V17h5v10H5Zm9 0V10h5v17h-5Zm9 0V4h5v23h-5Z"/></svg>;
}

function ClientShowcase() {
  return <section className="client-showcase" id="clients" aria-labelledby="clients-title">
    <div className="client-section-heading"><p className="section-label">CLIENT PROOF</p><h2 id="clients-title">Trusted by organizations across India.</h2><p>Real websites for education, events, product testing, and quality-focused organizations. Explore the work, the problem it addressed, and the outcome it was designed to support.</p></div>
    <div className="client-marks" aria-label="Selected clients">{clients.map(client => <a href={client.portfolio} key={client.domain}><span aria-hidden="true">{client.name.split(' ').map(word => word[0]).join('').slice(0, 3)}</span><strong>{client.name}</strong><small>{client.category}</small></a>)}</div>
    <div className="client-projects">{clients.map(client => <article className="client-project" key={client.domain}>
      <a className="client-preview" href={client.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.name} website (opens in a new tab)`}><div className="client-screen"><Image src={client.image} alt={`${client.name} homepage preview`} width={1440} height={900} sizes="(max-width: 700px) 100vw, 50vw"/></div></a>
      <div className="client-project-copy"><p className="client-category">{client.category}</p><h3>{client.name}</h3><p>{client.description}</p><p className="client-outcome"><strong>Project outcome</strong>{client.outcome}</p><div className="client-project-links"><a className="client-visit" href={client.portfolio}>Read project story <span aria-hidden="true">→</span></a><a className="client-visit" href={client.url} target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span><span className="client-sr-only"> — {client.name}, opens in a new tab</span></a></div></div>
    </article>)}</div>
    <div className="client-proof-note"><strong>Need similar work for your organization?</strong><span>See the full portfolio or talk with Nixoware about your website, app, or custom software project.</span><a href="/portfolio">Explore portfolio <span aria-hidden="true">→</span></a><a href="/contact">Start a conversation <span aria-hidden="true">→</span></a></div>
  </section>;
}

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://nixoware.com/#professional-service',
        name: 'Nixoware Web and Mobile Development',
        url: 'https://nixoware.com/',
        provider: { '@id': 'https://nixoware.com/#organization' },
        areaServed: { '@type': 'Country', name: 'India' },
        serviceType: ['Web development', 'Mobile app development', 'E-commerce development', 'Custom web development', 'Website maintenance'],
        availableLanguage: ['English', 'Hindi']
      },
      {
        '@type': 'Organization',
        '@id': 'https://nixoware.com/#organization',
        name: 'Nixoware',
        url: 'https://nixoware.com/',
        logo: 'https://nixoware.com/icon.svg',
        slogan: 'Innovation & Solutions',
        description: 'Website development, mobile app development, e-commerce, custom web applications, and ongoing website maintenance services.',
        telephone: '+91-9650429575',
        email: 'nixoware@gmail.com',
        contactPoint: { '@type': 'ContactPoint', telephone: '+91-9650429575', contactType: 'sales', availableLanguage: ['English', 'Hindi'] },
        areaServed: { '@type': 'Country', name: 'India' },
        knowsAbout: ['Website development', 'Mobile app development', 'Website maintenance', 'E-commerce development', 'Custom web applications', 'UI/UX design'],
        areaServed: { '@type': 'Country', name: 'India' }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://nixoware.com/#website',
        url: 'https://nixoware.com/',
        name: 'Nixoware',
        publisher: { '@id': 'https://nixoware.com/#organization' },
        inLanguage: 'en-IN'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nixoware.com/#webpage',
        url: 'https://nixoware.com/',
        name: 'Website, Mobile App & Maintenance Services | Nixoware',
        isPartOf: { '@id': 'https://nixoware.com/#website' },
        about: { '@id': 'https://nixoware.com/#organization' },
        description: 'Nixoware builds and maintains responsive websites, mobile apps, e-commerce stores, and custom web applications for growing businesses.',
        inLanguage: 'en-IN'
      },
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What does a web development company do?', acceptedAnswer: { '@type': 'Answer', text: 'A web development company plans, designs, builds, tests, launches, and maintains websites or web applications around a business goal and its users.' } },
        { '@type': 'Question', name: 'How much does website development cost in India?', acceptedAnswer: { '@type': 'Answer', text: 'Website development cost depends on the number of pages, design needs, content, integrations, functionality, hosting, and ongoing support. Nixoware recommends a scope and estimate after understanding those requirements.' } },
        { '@type': 'Question', name: 'Can Nixoware maintain a website after launch?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Website maintenance can include software updates, security checks, backups, uptime and form monitoring, content changes, performance improvements, and ongoing feature work.' } }
      ] }
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="site-header" id="top"><Brand/><MobileNavigation/><a className="header-cta" href="/contact">Start a conversation <Arrow/></a></header>
    <main>
      <section className="hero" id="banner">
        <div className="hero-copy"><h1>Web & mobile development<br/><em>for growing businesses.</em></h1><p>Nixoware designs, develops, and maintains high-performance websites, mobile apps, e-commerce platforms, and custom web applications for businesses across India.</p><div className="hero-actions"><a className="button coral" href="/contact">Start your project <Arrow/></a><a className="hero-secondary" href="#services">Explore our services <Arrow/></a></div></div>
        <div className="hero-media web-product-media"><Image src="/web-development-hero.png" alt="Illustrative website, mobile application, and dashboard designs displayed on digital devices" fill priority sizes="(max-width: 980px) 100vw, 58vw"/></div>
      </section>

      <ClientShowcase/>

      <section className="homepage-proof light-section" aria-labelledby="industries-title">
        <div className="homepage-proof-heading"><p className="section-label">WHO WE SUPPORT</p><h2 id="industries-title">Digital products for teams with meaningful work to do.</h2><p>We work with growing organizations across India that need a clearer customer experience, a more capable digital channel, or a simpler way to run their operations.</p></div>
        <div className="homepage-proof-grid"><article><span>01</span><h3>Healthcare</h3><p>Hospital and healthcare websites that make services, doctors, appointments, and patient information easier to find.</p></article><article><span>02</span><h3>Education and events</h3><p>Content-rich websites that help institutions, forums, and event teams communicate with their audiences.</p></article><article><span>03</span><h3>Professional and product services</h3><p>Service-led websites, portals, and workflows that explain expertise and turn interest into action.</p></article></div>
        <div className="homepage-technologies"><p className="section-label">OUR TECHNOLOGY APPROACH</p><p>We choose technology around the product, team, budget, and future ownership. Our work can include Next.js and React websites, Node.js APIs, content management systems, payment and CRM integrations, analytics, cloud hosting, and maintainable responsive interfaces.</p><a href="/software-development" className="text-link">Explore custom software development <Arrow/></a></div>
      </section>

      <section className="capabilities services-refresh light-section" id="services">
        <div className="section-lead"><p className="section-label">OUR IT SERVICES</p><h2>Everything you need to<br/><span>build and grow online.</span></h2><p>From your first idea to launch and long-term support, one experienced team handles design, development, and maintenance.</p></div>
        <div className="capability-list">{capabilities.map(item => <article key={item.title}><span className="item-number">{item.number}</span><CapabilityIcon type={item.icon}/><h3>{item.title}</h3><p>{item.text}</p><details className="service-detail"><summary>Explore capabilities</summary><p>{serviceDetails[item.number]}</p></details><a href={item.href} aria-label={`Explore ${item.title}`}>Explore service <Arrow/></a></article>)}</div>
        <div className="services-cta"><strong>Have a project in mind?</strong><span>Tell us what you want to build, improve, or maintain.</span><a className="button primary" href="/contact">Get a project quote <Arrow/></a></div>
      </section>

      <section className="product-studio" id="maintenance" aria-labelledby="product-title">
        <div className="studio-intro"><div><p className="section-label">WEBSITE MAINTENANCE</p><h2 id="product-title">Your website stays<br/>secure, fast, and current.</h2></div><div className="studio-summary"><p>Launch is only the beginning. We provide dependable ongoing support so your website continues to work for your business.</p><a className="button primary" href="/contact">Discuss maintenance <Arrow/></a></div></div>
        <div className="studio-journey">{[['01','Keep it protected','Regular software updates, security checks, backups, and recovery planning help reduce avoidable risk.','Security & backups'],['02','Keep it performing','We monitor speed, uptime, forms, links, and key journeys, then fix issues before they affect customers.','Performance monitoring'],['03','Keep it improving','Request content changes, design refinements, new pages, integrations, and feature upgrades as your business evolves.','Ongoing improvements']].map(([n,title,copy,outcome])=><article key={n}><span className="journey-number">{n}</span><h3>{title}</h3><p>{copy}</p><div className="journey-outcome"><small>INCLUDED</small><strong>{outcome}</strong></div></article>)}</div>
      </section>

      <section className="operations dark-section" id="development"><div className="operations-heading"><p className="section-label">WEB & APP DEVELOPMENT</p><h2>Designed for your customers.<br/><span>Engineered for your business.</span></h2><p>We combine clear user experience with dependable development to create digital solutions that are easy to use, manage, and extend.</p></div><div className="operations-columns"><div><h3>Website development</h3><p>Professional websites that communicate clearly and perform reliably.</p><details open><summary>Business & corporate websites</summary><p>Responsive, search-friendly websites that establish credibility and help customers take action.</p></details><details><summary>E-commerce & online stores</summary><p>Secure shopping experiences with product management, payments, orders, and customer accounts.</p></details><details><summary>Custom web applications</summary><p>Portals, dashboards, booking systems, and internal tools tailored to your operations.</p></details></div><div><h3>Mobile app development</h3><p>Useful mobile experiences built for real users and long-term growth.</p><details open><summary>Android, iOS & cross-platform</summary><p>Choose the right approach for your users, budget, timeline, and future product roadmap.</p></details><details><summary>Backend & API integration</summary><p>Connect apps securely with databases, payments, notifications, and existing business systems.</p></details><details><summary>Testing, launch & upgrades</summary><p>Test across devices, prepare store releases, monitor performance, and deliver future improvements.</p></details></div></div></section>

      <section className="approach dark-section" id="approach">
        <div className="section-lead"><h2>From idea to<br/>ongoing support.</h2><span className="short-rule"></span><p>A practical, transparent process that keeps your project focused and predictable.</p><a className="button coral" href="/contact">Plan your project <Arrow/></a></div>
        <div className="steps">{steps.map((step, index) => <article key={step.title}><div className="step-top"><span>{step.number}</span>{index < steps.length - 1 ? <i/> : null}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="story light-section" id="work">
        <div className="story-copy"><p className="section-label">OUR WORK</p><h2>Real websites.<br/>Real business outcomes.</h2><p>We create digital experiences that help organizations explain their value, reach customers, and manage their work more effectively. Explore websites we have delivered for education, events, testing, and professional services.</p><a href="/portfolio" className="text-link">View our portfolio <Arrow/></a></div>
        <div className="story-media"><Image src="/cloud-operations.png" alt="Server cabinets in a modern cloud data center" fill sizes="(max-width: 980px) 100vw, 52vw"/><div className="story-note">Simpler systems.<br/>Stronger outcomes.<span></span></div></div>
      </section>

      <section className="principles dark-section" id="company">
        <div className="section-lead"><h2>A dependable technology<br/>partner for your business.</h2><span className="short-rule"></span><p>Clear communication, thoughtful engineering, and reliable support from the first conversation onward.</p></div>
        <div className="principle-list"><article><span>01</span><h3>Built around your goals</h3><p>Every recommendation starts with your customers, operations, and business priorities.</p></article><article><span>02</span><h3>Clear and transparent</h3><p>You always know what we are building, why it matters, and what happens next.</p></article><article><span>03</span><h3>Support after launch</h3><p>We stay available for maintenance, improvements, troubleshooting, and future growth.</p></article></div>
      </section>

      <section className="homepage-faq light-section" aria-labelledby="homepage-faq-title"><div className="homepage-faq-heading"><p className="section-label">COMMON QUESTIONS</p><h2 id="homepage-faq-title">A practical start for your next digital project.</h2></div><div className="homepage-faq-list"><details><summary>What services does Nixoware provide?</summary><p>We provide website development, mobile app development, website maintenance, e-commerce development, custom web applications, and UI/UX design.</p></details><details><summary>Who does Nixoware work with?</summary><p>We support startups, small businesses, growing companies, healthcare organizations, education and event teams, and professional service organizations across India.</p></details><details><summary>Can you improve an existing website?</summary><p>Yes. We can audit and improve content, user experience, accessibility, speed, security, forms, integrations, and ongoing maintenance without assuming a complete rebuild is necessary.</p></details></div></section>

      <section className="contact-connect" id="contact" aria-labelledby="contact-title"><div className="connect-copy"><h2 id="contact-title">Let’s build something<br/>valuable together.</h2><p>Whether you need a new website, a mobile app, or reliable maintenance for an existing platform, tell us what you want to achieve.</p><ul className="connect-benefits"><li>Discuss your goals with our team</li><li>Receive a practical technical recommendation</li><li>Define scope, timeline, and the next step</li></ul><div className="connect-details"><a href="tel:+919650429575"><span aria-hidden="true">↗</span><div><small>Call our team</small>+91 96504 29575</div></a><a href="mailto:nixoware@gmail.com"><span aria-hidden="true">@</span><div><small>Email us</small>nixoware@gmail.com</div></a></div></div><ContactForm/></section>
      <section className="homepage-social" aria-labelledby="social-title"><p className="section-label">FOLLOW NIXOWARE</p><h2 id="social-title">Connect with our work.</h2><div><a href="https://www.linkedin.com/company/nixoware/?viewAsMember=true" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/nixoware?stkn=cjZrd21kY3JibGky" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer className="site-footer"><div className="footer-brand-column"><p className="footer-kicker">NIXOWARE / 2026</p><Brand footer/><p>Nixoware designs, develops, and maintains websites, mobile apps, online stores, and custom web applications for growing businesses.</p><div className="social-links" aria-label="Social links"><a href="#contact" aria-label="LinkedIn">in</a><a href="#contact" aria-label="Instagram">◎</a><a href="#contact" aria-label="YouTube">▶</a></div></div><nav className="footer-links" aria-label="Services"><h3>Services</h3><a href="/web-development">Website development</a><a href="/mobile-app-development">Mobile app development</a><a href="#maintenance">Website maintenance</a><a href="/ecommerce-development">E-commerce</a></nav><nav className="footer-links" aria-label="Company"><h3>Company</h3><a href="/about">About us</a><a href="/portfolio">Portfolio</a><a href="/case-studies">Case studies</a><a href="/contact">Contact us</a></nav><nav className="footer-links" aria-label="Explore"><h3>Explore</h3><a href="#approach">Our process</a><a href="/ui-ux-design">UI/UX design</a><a href="/software-development">Custom software</a><a href="/blog">Insights</a></nav><small className="footer-copyright">© 2026 Nixoware. All rights reserved.</small></footer>
  </>;
}
