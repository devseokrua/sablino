import Container from '@/components/layout/container/Container';
import Link from 'next/link';
import contact from '@/data/contact.json';
import styles from './Footer.module.css';

export default function Footer() {
  const socials = [
    {
      key: 'facebook',
      href: contact.socials.facebook.href,
      icon: '/facebook.svg',
      ariaLabel: 'Facebook',
    },
    {
      key: 'instagram',
      href: contact.socials.instagram.href,
      icon: '/instagram.svg',
      ariaLabel: 'Instagram',
    },
    {
      key: 'telegram',
      href: contact.socials.telegram.href,
      icon: '/telegram.svg',
      ariaLabel: 'Telegram',
    },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="/" className={styles.logoLink}>
              <img src="/logo.svg" alt="Садиба «Саблінська»" className={styles.logo} />
            </Link>
            <p className={styles.copy}>© 2026 Садиба «Саблінська». Усі права захищені.</p>
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
                  <img src={social.icon} alt="" className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <nav className={styles.links}>
              <Link href="/conditions" target="_blank" rel="noopener noreferrer">
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
