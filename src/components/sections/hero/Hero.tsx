import Image from 'next/image';
import Container from '@/components/layout/container/Container';
import BookingModalTrigger from '@/components/booking/BookingModalTrigger';
import ResponsiveCallLink from '@/components/ui/responsive-call-link/ResponsiveCallLink';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.media} aria-hidden="true">
        <Image
          src="/hero.webp"
          alt="Садиба «Саблінська» біля водойми"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.stage}>
        <div className={styles.panel}>
          <Container>
            <div className={styles.content}>
              <h1 className={styles.title}>
                Садиба <br /> Саблінська
              </h1>

              <div className={styles.divider} />

              <p className={styles.description}>
                Затишні будинки на природі —<br />
                для сімейного відпочинку,
                <br />
                риболовлі та тихих вихідних.
              </p>

              <div className={styles.actions}>
                <ResponsiveCallLink className={styles.callButton}>
                  <svg className={styles.icon} aria-hidden="true" focusable="false">
                    <use href="/sprite.svg#icon-phone" />
                  </svg>
                  +38 (096) 756-60-91
                </ResponsiveCallLink>

                <BookingModalTrigger className={styles.callButton}>
                  Забронювати
                </BookingModalTrigger>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
