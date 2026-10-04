const infinityPath = 'M 63 32 C 52 19 43 11 31 11 C 18 11 9 20 9 32 C 9 44 18 53 31 53 C 43 53 52 45 63 32 C 74 19 83 11 95 11 C 108 11 117 20 117 32 C 117 44 108 53 95 53 C 83 53 74 45 63 32';

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
        <path className="brand-track brand-track-glow" d={infinityPath}/>
        <path className="brand-track brand-track-core" d={infinityPath}/>
        <path className="brand-track brand-track-runner" pathLength="100" d={infinityPath}/>
        <g className="brand-nodes"><circle cx="12" cy="28" r="2.6"/><circle cx="29" cy="11" r="2.4"/><circle cx="31" cy="52" r="2.4"/><circle cx="95" cy="8" r="2.4"/><circle cx="114" cy="22" r="2.6"/><circle cx="103" cy="47" r="2.4"/></g>
      </svg>
      <span className="brand-copy">
        <strong>NIXOWARE</strong>
        <small>INNOVATION <b>•</b> SOFTWARE <b>•</b> SERVICES</small>
      </span>
    </a>
  );
}
