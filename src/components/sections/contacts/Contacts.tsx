import Container from '@/components/layout/container/Container';
import contact from '@/data/contact.json';
import styles from './Contacts.module.css';

export default function Contacts() {
  return (
    <section id="contacts" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.title}>Контакти та розташування</h2>

          <div className={styles.layout}>
            <div className={styles.leftColumn}>
              <a
                href={contact.map.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.card} ${styles.addressCard}`}
              >
                <svg className={styles.icon} aria-hidden="true" focusable="false">
                  <use href="/sprite.svg#icon-pin" />
                </svg>
                <address className={styles.addressText}>
                  {contact.address.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </a>

              <div className={`${styles.card} ${styles.phonesCard}`}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className={`${styles.icon} ${styles.phoneIcon}`}
                >
                  <use href="/sprite.svg#icon-phone" />
                </svg>
                <ul className={styles.phoneList}>
                  {contact.phones.map((phone) => (
                    <li key={phone.href}>
                      <a href={phone.href} className={styles.phoneLink}>
                        {phone.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src={contact.map.embedSrc}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.mapFrame}
                title="Google Map"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
