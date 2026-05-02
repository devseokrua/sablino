import Container from '@/components/layout/container/Container';
import ResponsiveCallLink from '@/components/ui/responsive-call-link/ResponsiveCallLink';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
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

              <ResponsiveCallLink className={styles.callButton}>
                <svg className={styles.icon} aria-hidden="true" focusable="false">
                  <use href="/sprite.svg#icon-phone" />
                </svg>
                зателефонувати
              </ResponsiveCallLink>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
