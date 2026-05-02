'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import styles from './StickyCta.module.css';

const PHONE_HREF = 'tel:+380967566091';
const CONTACTS_HREF = '/#contacts';

export default function StickyCta() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    const ctaSection = document.getElementById('cta');

    if (!heroSection || !ctaSection) {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
    };

    const heroObserver = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting);
    }, observerOptions);

    const ctaObserver = new IntersectionObserver(([entry]) => {
      setIsCtaVisible(entry.isIntersecting);
    }, observerOptions);

    heroObserver.observe(heroSection);
    ctaObserver.observe(ctaSection);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  const showSticky = !isHeroVisible && !isCtaVisible;

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
