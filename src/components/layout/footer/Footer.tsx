import Container from '@/components/layout/container/Container';
import Link from 'next/link';
import contact from '@/data/contact.json';
import styles from './Footer.module.css';

export default function Footer() {
  const socials = [
    {
      key: 'facebook',
      href: contact.socials.facebook.href,
      iconId: 'icon-facebook',
      ariaLabel: 'Facebook',
    },
    {
      key: 'instagram',
      href: contact.socials.instagram.href,
      iconId: 'icon-instagram',
      ariaLabel: 'Instagram',
    },
    {
      key: 'telegram',
      href: contact.socials.telegram.href,
      iconId: 'icon-telegram',
      ariaLabel: 'Telegram',
    },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="/" className={styles.logoLink}>
              <img
                src="/logo.svg"
                alt="Садиба «Саблінська»"
                className={styles.logo}
              />
            </Link>
            <p className={styles.copy}>
              © 2026 Садиба «Саблінська». Усі права захищені.
            </p>
          </div>

          <div className={styles.center}>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className={styles.socialLink}
                >
                  <svg
                    className={styles.socialIcon}
                    aria-hidden="true"
                    focusable="false"
                  >
                    <use href={`/sprite.svg#${social.iconId}`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <nav className={styles.links}>
              <Link
                href="/conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Умови проживання
              </Link>
              <a href="#houses">Переглянути будинки</a>
            </nav>

            <a
              href="https://www.alexandroff.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.credit}
            >
              <span>Дизайн та розробка —</span>
              <img src="/loading.svg" alt="" className={styles.creditLogo} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
