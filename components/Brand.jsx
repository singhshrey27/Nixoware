export default function Brand({ footer = false }) {
  const gradientId = footer ? 'footer-logo-neon' : 'header-logo-neon';

  return (
    <a className={`brand${footer ? ' footer-brand' : ''}`} href="/" aria-label="Nixoware home">
      <svg className="brand-mark" viewBox="0 0 126 64" role="img" aria-label="Nixoware infinity symbol">
        <defs>
          <linearGradient id={gradientId} x1="9" y1="8" x2="113" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22f0f1"/>
            <stop offset=".42" stopColor="#00bdf8"/>
            <stop offset=".72" stopColor="#1184ff"/>
            <stop offset="1" stopColor="#744cff"/>
          </linearGradient>
        </defs>
        <path className="brand-track brand-track-glow" d="M62.5 32C50 13 38.5 8.5 25.5 10.5 10.5 12.8 5 27.5 11.8 40.8 18.5 54 35 57.5 47 45.5L78.5 14C90.5 2 107 5.5 113.8 18.8 120.5 32 115 46.8 100 49 87 51 75.5 46.5 63 27.5L50 13"/>
        <path className="brand-track brand-track-core" d="M62.5 32C50 13 38.5 8.5 25.5 10.5 10.5 12.8 5 27.5 11.8 40.8 18.5 54 35 57.5 47 45.5L78.5 14C90.5 2 107 5.5 113.8 18.8 120.5 32 115 46.8 100 49 87 51 75.5 46.5 63 27.5L50 13"/>
        <path className="brand-track brand-track-runner" pathLength="100" d="M62.5 32C50 13 38.5 8.5 25.5 10.5 10.5 12.8 5 27.5 11.8 40.8 18.5 54 35 57.5 47 45.5L78.5 14C90.5 2 107 5.5 113.8 18.8 120.5 32 115 46.8 100 49 87 51 75.5 46.5 63 27.5L50 13"/>
        <g className="brand-nodes"><circle cx="12" cy="28" r="2.6"/><circle cx="29" cy="11" r="2.4"/><circle cx="31" cy="52" r="2.4"/><circle cx="95" cy="8" r="2.4"/><circle cx="114" cy="22" r="2.6"/><circle cx="103" cy="47" r="2.4"/></g>
      </svg>
      <span className="brand-copy">
        <strong>NIXOWARE</strong>
        <small>INNOVATION <b>•</b> SOFTWARE <b>•</b> SERVICES</small>
      </span>
    </a>
  );
}
