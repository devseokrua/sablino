import Container from '@/components/layout/container/Container';
import Button from '@/components/ui/button/Button';
import contact from '@/data/contact.json';
import styles from './Hero.module.css';

export default function Hero() {
  const primaryPhone =
    contact.phones.find((phone) => phone.isPrimary) ?? contact.phones[0];

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

              <Button className={styles.callButton} href={primaryPhone.href}>
                <svg className={styles.icon} aria-hidden="true" focusable="false">
                  <use href="/sprite.svg#icon-phone" />
                </svg>
                зателефонувати
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
