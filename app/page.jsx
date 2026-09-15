import Image from 'next/image';
import Brand from '../components/Brand';
import { ContactForm, MobileNavigation } from '../components/Interactive';

const capabilities = [
  { number: '01', title: 'Product Engineering', text: 'Design and build digital products that are useful, resilient, and ready to evolve.', icon: 'cube' },
  { number: '02', title: 'Intelligent Automation', text: 'Simplify complex operations with practical AI and thoughtfully automated workflows.', icon: 'spark' },
  { number: '03', title: 'Digital Transformation', text: 'Modernize platforms, connect data, and give teams the systems they need to move faster.', icon: 'bars' },
  { number: '04', title: 'New Product Development', text: 'Turn an early idea into a validated MVP, then build the roadmap for a scalable web, mobile, or SaaS product.', icon: 'cube' },
  { number: '05', title: 'DevOps & Platform Engineering', text: 'Connect development and operations with automated delivery pipelines, infrastructure as code, and reliable release workflows.', icon: 'spark' },
  { number: '06', title: 'Cloud Management', text: 'Plan migrations, manage infrastructure, improve observability, and control cloud spend as your business grows.', icon: 'cloud' },
];
const serviceDetails = {
  '01': 'Web and mobile applications, API development, quality assurance, and ongoing product improvements.',
  '02': 'Workflow discovery, process integration, AI-assisted operations, and automation monitoring.',
  '03': 'Legacy modernization, system integration, data connectivity, and digital experience improvements.',
  '04': 'Discovery workshops, UX prototypes, MVP development, launch preparation, and product iteration.',
  '05': 'CI/CD pipelines, infrastructure as code, container workflows, and release management.',
  '06': 'Cloud migration, monitoring, backup planning, access reviews, and resource cost optimization.',
};
const clients = [
  { name: 'Pune Education Forum', category: 'Education & Events', url: 'https://puneeducationforum.in/', domain: 'puneeducationforum.in', image: '/pune-education-forum-website.png', description: 'A leadership forum for conversations shaping the future of learning.' },
  { name: 'Teknolab', category: 'Product Testing & Quality', url: 'https://teknolab.in/', domain: 'teknolab.in', image: '/teknolab-website.png', description: 'Independent testing for electronics, IT, lighting, and electrical products.' },
];
const steps = [
  { number: '01', title: 'Discover', text: 'Understand your goals, users, systems, and opportunities.' },
  { number: '02', title: 'Design', text: 'Shape the right solution and create a clear roadmap.' },
  { number: '03', title: 'Build', text: 'Engineer, test, and iterate with speed and precision.' },
  { number: '04', title: 'Scale', text: 'Launch, optimize, and create lasting capability.' },
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
    <div className="client-section-heading"><p className="section-label">OUR CLIENTS</p><h2 id="clients-title">Clients we are proud to support.</h2><p>Digital experiences built for organizations with meaningful work to do.</p></div>
    <div className="client-projects">{clients.map(client => <article className="client-project" key={client.domain}>
      <a className="client-preview" href={client.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.name} website (opens in a new tab)`}><div className="client-screen"><Image src={client.image} alt={`${client.name} homepage preview`} width={1440} height={900} sizes="(max-width: 700px) 100vw, 50vw"/></div></a>
      <div className="client-project-copy"><p className="client-category">{client.category}</p><h3>{client.name}</h3><p>{client.description}</p><a className="client-visit" href={client.url} target="_blank" rel="noopener noreferrer">Explore client <span aria-hidden="true">↗</span><span className="client-sr-only"> — {client.name}, opens in a new tab</span></a></div>
    </article>)}</div>
  </section>;
}

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nixoware.com/#organization',
        name: 'Nixoware',
        url: 'https://nixoware.com/',
        logo: 'https://nixoware.com/icon.svg',
        slogan: 'Innovation & Solutions',
        description: 'Web development, custom software, product engineering, DevOps, cloud management, AI automation, and digital transformation services.',
        telephone: '+91-9650429575',
        email: 'hello@nixoware.com',
        contactPoint: { '@type': 'ContactPoint', telephone: '+91-9650429575', contactType: 'sales', availableLanguage: ['English', 'Hindi'] },
        knowsAbout: ['Website development', 'Web application development', 'Product engineering', 'DevOps consulting', 'Cloud management', 'Cloud migration', 'Intelligent automation', 'Digital transformation']
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
        name: 'Web Development, DevOps & Cloud Services | Nixoware',
        isPartOf: { '@id': 'https://nixoware.com/#website' },
        about: { '@id': 'https://nixoware.com/#organization' },
        description: 'Website development, custom software development, DevOps consulting, cloud management, AI automation, and digital transformation services.',
        inLanguage: 'en-IN'
      }
    ]
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="site-header" id="top"><Brand/><MobileNavigation/><a className="header-cta" href="#contact">Start a conversation <Arrow/></a></header>
    <main>
      <section className="hero" id="banner">
        <div className="hero-copy"><h1>Websites.<br/>Digital products.<br/><em>Cloud solutions.</em></h1><p>We design and develop websites, applications, and cloud platforms that help your business grow.</p><div className="hero-actions"><a className="button coral" href="#contact">Discuss your project <Arrow/></a><a className="hero-secondary" href="#services">Explore our expertise <Arrow/></a></div><div className="hero-footnote">WEB DEVELOPMENT <span>/</span> DEVOPS &amp; CLOUD</div></div>
        <div className="hero-media web-product-media"><Image src="/web-development-hero.png" alt="Illustrative website, mobile application, and dashboard designs displayed on digital devices" fill priority sizes="(max-width: 980px) 100vw, 58vw"/><span className="visual-caption">Illustrative digital product concepts</span></div>
      </section>

      <ClientShowcase/>

      <section className="capabilities services-refresh light-section" id="services">
        <div className="section-lead"><p className="section-label">WHAT WE PROVIDE</p><h2>Services built around<br/><span>your ambition.</span></h2><p>From idea to impact, we help you design, modernize, automate, and scale with confidence.</p></div>
        <div className="capability-list">{capabilities.map(item => <article key={item.title}><span className="item-number">{item.number}</span><CapabilityIcon type={item.icon}/><h3>{item.title}</h3><p>{item.text}</p><details className="service-detail"><summary>Explore capabilities</summary><p>{serviceDetails[item.number]}</p></details><a href="#contact" aria-label={`Discuss ${item.title}`}>Discuss this service <Arrow/></a></article>)}</div>
        <div className="services-cta"><strong>Have a challenge in mind?</strong><span>Let’s explore how Nixoware can help you move forward.</span><a className="button primary" href="#contact">Start a conversation <Arrow/></a></div>
      </section>

      <section className="product-studio" id="products" aria-labelledby="product-title">
        <div className="studio-intro"><div><p className="section-label">NEW PRODUCT DEVELOPMENT</p><h2 id="product-title">Your next idea.<br/>A product people love.</h2></div><div className="studio-summary"><p>From the first sketch to a scalable release, we bring strategy, design, and engineering together.</p><a className="button primary" href="#contact">Plan your product <Arrow/></a></div></div>
        <div className="studio-journey">{[['01','Validate the opportunity','Understand your users and business opportunity through research, discovery workshops, and a focused product brief.','Product brief'],['02','Make the idea tangible','Turn insights into experience designs and clickable prototypes, with a clear scope for your MVP.','Interactive prototype'],['03','Launch and learn','Engineer, test, and launch your product, then use real feedback to shape the next release.','Launch-ready MVP']].map(([n,title,copy,outcome])=><article key={n}><span className="journey-number">{n}</span><h3>{title}</h3><p>{copy}</p><div className="journey-outcome"><small>DELIVERABLE</small><strong>{outcome}</strong></div></article>)}</div>
      </section>

      <section className="operations dark-section" id="cloud"><div className="operations-heading"><p className="section-label">DEVOPS & CLOUD OPERATIONS</p><h2>Confidence in every release.<br/><span>Clarity across your cloud.</span></h2><p>Build a dependable foundation for your applications, with delivery automation and ongoing infrastructure management working together.</p></div><div className="operations-columns"><div><h3>Deliver with DevOps</h3><p>Repeatable releases. Clear ownership. Less manual work.</p><details open><summary>CI/CD & release automation</summary><p>Build, test, and deploy through version-controlled pipelines with approval gates and rollback planning.</p></details><details><summary>Infrastructure as code</summary><p>Standardize environments with reusable infrastructure definitions, change review, and configuration management.</p></details><details><summary>Containers & platform engineering</summary><p>Define container workflows and developer environments that make applications easier to deploy and operate.</p></details></div><div><h3>Operate with cloud clarity</h3><p>Visibility, resilience, and a more predictable cost base.</p><details open><summary>Cloud migration & modernization</summary><p>Assess workloads, map dependencies, and plan phased migrations with validation and recovery steps.</p></details><details><summary>Monitoring & reliability</summary><p>Connect logs, metrics, and alerts to actionable runbooks, backup checks, and incident response workflows.</p></details><details><summary>Cost & access management</summary><p>Review resource utilization, budgets, access controls, and ownership to keep cloud operations accountable.</p></details></div></div></section>

      <section className="approach dark-section" id="approach">
        <div className="section-lead"><h2>From clarity to<br/>capability.</h2><span className="short-rule"></span><p>A structured, collaborative approach designed to turn complexity into progress.</p><a className="button coral" href="#work">Our approach <Arrow/></a></div>
        <div className="steps">{steps.map((step, index) => <article key={step.title}><div className="step-top"><span>{step.number}</span>{index < steps.length - 1 ? <i/> : null}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="story light-section" id="work">
        <div className="story-copy"><p className="section-label">Illustrative transformation</p><h2>One connected platform.<br/>A business ready to scale.</h2><p>Bring fragmented systems together with integrated applications, automated workflows, and a cloud foundation. A typical engagement connects product improvements with delivery automation and operational visibility, giving teams a clearer path from idea to release.</p><a href="#contact" className="text-link">Discuss your transformation <Arrow/></a></div>
        <div className="story-media"><Image src="/cloud-operations.png" alt="Server cabinets in a modern cloud data center" fill sizes="(max-width: 980px) 100vw, 52vw"/><div className="story-note">Simpler systems.<br/>Stronger outcomes.<span></span></div></div>
      </section>

      <section className="principles dark-section" id="company">
        <div className="section-lead"><h2>Built for meaningful<br/>progress.</h2><span className="short-rule"></span><p>Our principles guide how we work, who we work with, and the impact we aim to create.</p></div>
        <div className="principle-list"><article><span>01</span><h3>People first</h3><p>Great technology starts with real human understanding.</p></article><article><span>02</span><h3>Do what’s right</h3><p>We take a long-term view, always.</p></article><article><span>03</span><h3>A more open future</h3><p>We build inclusive, sustainable solutions for what’s next.</p></article></div>
      </section>

      <section className="contact-connect" id="contact" aria-labelledby="contact-title"><div className="connect-copy"><h2 id="contact-title">Let’s talk about<br/>your next project.</h2><p>Whether you need a website, a new digital product, or a stronger cloud foundation, let’s explore how we can help.</p><ul className="connect-benefits"><li>Discuss your goals with our team</li><li>Explore the right technical approach</li><li>Define a practical next step</li></ul><div className="connect-details"><a href="tel:9650429575"><span aria-hidden="true">↗</span><div><small>Call our team</small>9650429575</div></a><a href="mailto:hello@nixoware.com"><span aria-hidden="true">@</span><div><small>Email us</small>hello@nixoware.com</div></a></div></div><ContactForm/></section>
    </main>
    <footer className="site-footer"><div className="footer-brand-column"><p className="footer-kicker">NIXOWARE / 2026</p><Brand footer/><p>Nixoware helps ambitious teams design, build, and run digital products, cloud platforms, and dependable technology systems.</p><div className="social-links" aria-label="Social links"><a href="#contact" aria-label="LinkedIn">in</a><a href="#contact" aria-label="Instagram">◎</a><a href="#contact" aria-label="YouTube">▶</a></div></div><nav className="footer-links" aria-label="Explore"><h3>Explore</h3><a href="#services">Services</a><a href="#products">Products</a><a href="#cloud">DevOps &amp; Cloud</a><a href="#approach">Approach</a></nav><nav className="footer-links" aria-label="Company"><h3>About us</h3><a href="#company">Our company</a><a href="#work">Our work</a><a href="#contact">Contact us</a><a href="#contact">Careers</a></nav><nav className="footer-links" aria-label="Legal"><h3>Legal</h3><a href="#contact">Privacy notice</a><a href="#contact">Cookie settings</a><a href="#contact">Accessibility statement</a><a href="#contact">Terms of use</a></nav><small className="footer-copyright">© 2026 Nixoware. All rights reserved.</small></footer>
  </>;
}
