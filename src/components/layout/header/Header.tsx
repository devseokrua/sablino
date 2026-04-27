import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="Садиба Саблінська" />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            <a href="#houses">Будинки</a>
            <a href="#rules">Умови проживання</a>
            <a href="#gallery">Галерея</a>
            <a href="#contacts">Контакти</a>
          </nav>

          <div className={styles.toggle}>
            <div className={styles.toggleThumb} />
          </div>
        </div>
      </div>
    </header>
  );
}
