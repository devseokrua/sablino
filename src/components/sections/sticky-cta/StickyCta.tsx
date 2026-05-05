'use client';

import { useEffect, useState } from 'react';
import BookingModal from '@/components/booking/BookingModal';
import Button from '@/components/ui/button/Button';
import styles from './StickyCta.module.css';

const PHONE_HREF = 'tel:+380967566091';
const CONTACTS_HREF = '/#contacts';

export default function StickyCta() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [hasReachedCta, setHasReachedCta] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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

  if (!showSticky && !isBookingOpen) {
    return null;
  }

  return (
    <>
      {showSticky ? (
        <div className={styles.root}>
          <div className={styles.mobileBar}>
            <Button className={styles.mobileButton} href={PHONE_HREF}>
              <svg
                className={`${styles.icon} ${styles.phoneIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/sprite.svg#icon-phone" />
              </svg>
              (096) 756-60-91
            </Button>
            <Button
              type="button"
              className={styles.mobileButton}
              onClick={() => setIsBookingOpen(true)}
            >
              <svg
                className={`${styles.icon} ${styles.bookingIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/sprite.svg#icon-booking" />
              </svg>
              Забронювати
            </Button>
          </div>

          <div className={styles.desktopActions}>
            <Button
              className={`${styles.desktopButton} ${styles.phoneDesktopButton}`}
              href={CONTACTS_HREF}
              aria-label="Перейти до контактів"
            >
              <svg
                className={`${styles.icon} ${styles.phoneIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/sprite.svg#icon-phone" />
              </svg>
              <span className={styles.srOnly}>Перейти до контактів</span>
            </Button>
            <Button
              type="button"
              className={`${styles.desktopButton} ${styles.bookingDesktopButton}`}
              aria-label="Відкрити форму бронювання"
              onClick={() => setIsBookingOpen(true)}
            >
              <svg
                className={`${styles.icon} ${styles.bookingIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/sprite.svg#icon-booking" />
              </svg>
              <span className={styles.srOnly}>Забронювати</span>
            </Button>
          </div>
        </div>
      ) : null}

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
