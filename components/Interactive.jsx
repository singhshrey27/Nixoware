'use client';
import { useEffect, useState } from 'react';

const navigationItems = [
  ['banner', 'Home'],
  ['clients', 'Clients'],
  ['services', 'Services'],
  ['products', 'Products'],
  ['cloud', 'DevOps & Cloud'],
  ['approach', 'Approach'],
  ['work', 'Work'],
  ['company', 'Company'],
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('services');
  const close = () => setOpen(false);
  useEffect(() => {
    const sections = navigationItems.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.65] });
    sections.forEach(section => observer.observe(section));
    const onKeyDown = event => { if (event.key === 'Escape') close(); };
    const onPointerDown = event => { if (open && !event.target.closest('.site-header')) close(); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);
  return <>
    <nav id="primary-navigation" className={open ? 'open' : ''} aria-label="Primary navigation">
      {navigationItems.map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} onClick={close} href={`#${id}`}>{label}</a>)}
    </nav>
    <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(value => !value)}><span></span><span></span></button>
  </>;
}

export function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nCompany: ${data.get('company') || 'Not specified'}\nService: ${data.get('service')}\n\n${data.get('message')}`;
    window.location.href = `mailto:hello@nixoware.com?subject=${encodeURIComponent('Project enquiry - Nixoware')}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app will open with your enquiry. Review it and press Send there. If it does not open, email hello@nixoware.com directly.');
  }
  return <form className="enquiry-panel" onSubmit={submit}>
    <div className="enquiry-heading"><h3>Tell us what you have in mind</h3><p>A few details will help us start the conversation.</p></div>
    <label>Your name<input required name="name" autoComplete="name" placeholder="Jane Smith"/></label>
    <label>Work email<input required type="email" name="email" autoComplete="email" placeholder="jane@company.com"/></label>
    <label className="phone-field">Contact number<input required type="tel" name="phone" autoComplete="tel" inputMode="tel" minLength={7} maxLength={25} pattern="[+0-9() .\u002d]{7,25}" title="Enter a contact number with 7 to 25 characters using digits, spaces, +, parentheses, or hyphens." placeholder="Your number, including country code"/></label>
    <label>Company (optional)<input name="company" autoComplete="organization" placeholder="Your company"/></label>
    <label className="enquiry-wide">Service of interest<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{['Product Engineering','Intelligent Automation','Digital Transformation','New Product Development','DevOps & Platform Engineering','Cloud Management','Website Development','Not sure yet'].map(service=><option key={service}>{service}</option>)}</select></label>
    <label className="message-field">What can we help with?<textarea required name="message" placeholder="Tell us about your project"/></label>
    <button className="button primary" type="submit">Prepare email enquiry <span>→</span></button>
    <p className="enquiry-note">Opens your email app. Nothing is sent automatically.</p>
    <p className="form-status" aria-live="polite">{status}</p>
  </form>;
}
