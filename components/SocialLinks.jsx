const profiles = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/nixoware/',
    icon: <path d="M5.2 8.2H1.6V20h3.6V8.2ZM3.4 2.3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM20.4 13.2c0-3.6-1.9-5.3-4.5-5.3-2.1 0-3 1.1-3.5 1.9V8.2H8.8V20h3.6v-5.8c0-1.5.3-3 2.2-3 1.9 0 1.9 1.8 1.9 3.1V20h3.6l.3-6.8Z" />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/nixoware/',
    icon: <><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.3"/><circle className="social-icon-dot" cx="17.8" cy="6.3" r="1"/></>,
  },
];

export default function SocialLinks({ compact = false }) {
  return <div className={compact ? 'social-profile-links compact' : 'social-profile-links'} aria-label="Nixoware social media profiles">
    {profiles.map(profile => <a key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} — opens in a new tab`}>
      <span className="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{profile.icon}</svg></span>
      {compact ? null : <><span>{profile.name}</span><svg className="social-arrow" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M6 4h8v8"/></svg></>}
    </a>)}
  </div>;
}
