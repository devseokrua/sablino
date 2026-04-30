import Container from '@/components/layout/container/Container';
import Button from '@/components/ui/button/Button';
import contact from '@/data/contact.json';
import styles from './Cta.module.css';

export default function Cta() {
  const primaryPhone =
    contact.phones.find((phone) => phone.isPrimary) ?? contact.phones[0];

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

            <Button className={styles.button} href={primaryPhone.href}>
              <svg className={styles.icon} aria-hidden="true" focusable="false">
                <use href="/sprite.svg#icon-phone" />
              </svg>
              зателефонувати
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
