'use client';
import { useEffect, useState } from 'react';

const navigationItems = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/portfolio', 'Portfolio'],
  ['/case-studies', 'Case Studies'],
  ['/about', 'About'],
  ['/blog', 'Insights'],
  ['/contact', 'Contact'],
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const close = () => setOpen(false);
  useEffect(() => {
    setActive(window.location.pathname);
    const onKeyDown = event => { if (event.key === 'Escape') close(); };
    const onPointerDown = event => { if (open && !event.target.closest('.site-header')) close(); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);
  return <>
    <nav id="primary-navigation" className={open ? 'open' : ''} aria-label="Primary navigation">
      {navigationItems.map(([href, label]) => <a key={href} className={active === href ? 'active' : ''} onClick={close} href={href}>{label}</a>)}
    </nav>
    <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(value => !value)}><span></span><span></span></button>
  </>;
}

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiBaseUrl = (process.env.NEXT_PUBLIC_ELECTRONIC_BASE_API_URL || 'http://localhost:4000/api').replace(/\/+$/, '');

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch(`${apiBaseUrl}/nixoware-enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to submit your enquiry. Please try again.');

      form.reset();
      setStatus(`Enquiry received. Save this reference to view your request: ${result.enquiry.reference}`);
    } catch (error) {
      setStatus(error.message || 'Unable to submit your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return <form className="enquiry-panel" onSubmit={submit}>
    <div className="enquiry-heading"><h3>Tell us what you have in mind</h3><p>A few details will help us start the conversation.</p></div>
    <label>Your name<input required name="name" autoComplete="name" placeholder="Jane Smith"/></label>
    <label>Work email<input required type="email" name="email" autoComplete="email" placeholder="jane@company.com"/></label>
    <label className="phone-field">Contact number<input required type="tel" name="phone" autoComplete="tel" inputMode="tel" minLength={7} maxLength={25} pattern="[+0-9() .\u002d]{7,25}" title="Enter a contact number with 7 to 25 characters using digits, spaces, +, parentheses, or hyphens." placeholder="Your number, including country code"/></label>
    <label>Company (optional)<input name="company" autoComplete="organization" placeholder="Your company"/></label>
    <label className="enquiry-wide">Service of interest<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{['Website Development','Mobile App Development','Website Maintenance','E-commerce Development','Custom Web Application','UI/UX Design','Not sure yet'].map(service=><option key={service}>{service}</option>)}</select></label>
    <label className="message-field">What can we help with?<textarea required name="message" placeholder="Tell us about your project"/></label>
    <button className="button primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send enquiry'} <span>→</span></button>
    <p className="enquiry-note">Your details are sent securely to our enquiry team.</p>
    <p className="form-status" aria-live="polite">{status}</p>
  </form>;
}
