'use client';

import { useEffect } from 'react';
import { trackLinkClick } from '../lib/analytics';

export default function ConversionTracking() {
  useEffect(() => {
    const onClick = event => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (anchor) trackLinkClick(anchor);
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
