import Image from 'next/image';

export default function Brand({ footer = false }) {
  return (
    <a
      className={`brand${footer ? ' footer-brand' : ''}`}
      href="/"
      aria-label="Nixoware home"
    >
      <Image
        className="brand-logo"
        src="/nixoware-logo.svg"
        alt=""
        width={660}
        height={130}
        unoptimized
      />
    </a>
  );
}
