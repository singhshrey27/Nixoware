import Image from 'next/image';
import ProofMotion from './ProofMotion';
import { portfolioProjects, portfolioSlugs } from '../lib/portfolio';
import { SiteArrow } from './SiteChrome';

export default function ClientProof() {
  return <section className="client-proof-marquee" aria-label="Selected Nixoware client projects"><ProofMotion><div className="proof-track">{[0, 1, 2].map(copy => <div className="proof-group" key={copy} aria-hidden={copy > 0 ? true : undefined} inert={copy > 0 ? true : undefined}>{portfolioSlugs.map(slug => {
    const project = portfolioProjects[slug];
    return <a className="proof-project" href={`/portfolio/${slug}`} key={slug}><span className="proof-thumbnail"><Image src={project.thumbnail} alt="" width={440} height={275} sizes="(max-width: 700px) 120px, 220px"/></span><span className="proof-project-copy"><strong>{project.client}</strong><span>{project.industry}</span><span className="proof-view">View project <SiteArrow/></span></span></a>;
  })}</div>)}</div></ProofMotion></section>;
}
