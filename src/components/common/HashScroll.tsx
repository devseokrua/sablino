'use client';

import { useEffect } from 'react';

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      const id = hash.replace('#', '');
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    };

    scrollToHash();

    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}
