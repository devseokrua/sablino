'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import styles from './StickyCta.module.css';

const PHONE_HREF = 'tel:+380967566091';
const CONTACTS_HREF = '/#contacts';

export default function StickyCta() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [hasReachedCta, setHasReachedCta] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('hero');

    if (!heroSection) {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
    };

    const heroObserver = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting);
    }, observerOptions);

    const updateCtaVisibility = () => {
      const ctaElement = document.getElementById('cta');

      if (!ctaElement) {
        setHasReachedCta(false);
        return;
      }

      const ctaTop = ctaElement.getBoundingClientRect().top;
      const hasReachedCtaNow = ctaTop <= window.innerHeight;

      setHasReachedCta(hasReachedCtaNow);
    };

    heroObserver.observe(heroSection);
    updateCtaVisibility();
    window.addEventListener('scroll', updateCtaVisibility, { passive: true });
    window.addEventListener('resize', updateCtaVisibility);

    return () => {
      heroObserver.disconnect();
      window.removeEventListener('scroll', updateCtaVisibility);
      window.removeEventListener('resize', updateCtaVisibility);
    };
  }, []);

  const showSticky = !isHeroVisible && !hasReachedCta;

  if (!showSticky) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.mobileBar}>
        <Button className={styles.mobileButton} href={PHONE_HREF}>
          <svg className={styles.icon} aria-hidden="true" focusable="false">
            <use href="/sprite.svg#icon-phone" />
          </svg>
          зателефонувати
        </Button>
      </div>

      <Button
        className={styles.desktopButton}
        href={CONTACTS_HREF}
        aria-label="зателефонувати"
      >
        <svg className={styles.icon} aria-hidden="true" focusable="false">
          <use href="/sprite.svg#icon-phone" />
        </svg>
        <span className={styles.srOnly}>зателефонувати</span>
      </Button>
    </div>
  );
}
