import Container from '@/components/layout/container/Container';
import ResponsiveCallLink from '@/components/ui/responsive-call-link/ResponsiveCallLink';
import BookingModalTrigger from '@/components/booking/BookingModalTrigger';
import styles from './Cta.module.css';

export default function Cta() {
  return (
    <section id="cta" className={styles.section}>
      <Container>
        <div className={styles.card}>
          <div className={styles.overlay} />

          <div className={styles.content}>
            <h2 className={styles.title}>Забронюйте вже зараз</h2>
            <p className={styles.description}>
              Кілька варіантів для відпочинку на будь-який формат
            </p>

            <div className={styles.actions}>
              <ResponsiveCallLink className={styles.button}>
                <svg className={styles.icon} aria-hidden="true" focusable="false">
                  <use href="/sprite.svg#icon-phone" />
                </svg>
                +38 (096) 756-60-91
              </ResponsiveCallLink>

              <BookingModalTrigger className={styles.button}>
                Забронювати
              </BookingModalTrigger>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
