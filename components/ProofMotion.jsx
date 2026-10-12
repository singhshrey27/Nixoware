'use client';

import { useEffect, useState } from 'react';

export default function ProofMotion({ children }) {
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  return <div className={`proof-motion${paused ? ' is-paused' : ''}`}>
    <div className="proof-heading"><h2>Selected work. Real organizations.</h2><button type="button" disabled={!ready} aria-pressed={paused} onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume client showcase' : 'Pause client showcase'}><svg viewBox="0 0 20 20" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6Z"/> : <path d="M7 4v12m6-12v12"/>}</svg>{paused ? 'Resume' : 'Pause'}</button></div>
    <div className="proof-window">{children}</div>
  </div>;
}
