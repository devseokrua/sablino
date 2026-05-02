'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/theme/ThemeToggle';
import styles from './Header.module.css';

const links = [
  { href: '/#houses', label: 'Будинки' },
  { href: '/conditions', label: 'Умови проживання' },
  { href: '/#gallery', label: 'Галерея' },
  { href: '/#contacts', label: 'Контакти' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    document.body.classList.add('header-menu-open');
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.classList.remove('header-menu-open');
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="Садиба Саблінська" />
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>

        {isMenuOpen ? (
          <button
            type="button"
            className={styles.burgerButton}
            aria-label="Закрити меню"
            aria-expanded="true"
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className={styles.burgerIcon} aria-hidden="true" focusable="false">
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className={styles.burgerButton}
            aria-label="Відкрити меню"
            aria-expanded="false"
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className={styles.burgerIcon} aria-hidden="true" focusable="false">
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        )}
      </div>

      {isMenuOpen && (
        <div className={styles.modalRoot}>
          <button
            type="button"
            aria-label="Закрити меню"
            className={styles.modalOverlay}
            onClick={closeMenu}
          />

          <div id="mobile-menu" className={styles.modalPanel} role="dialog" aria-modal="true">
            <button
              type="button"
              aria-label="Закрити меню"
              className={styles.modalCloseButton}
              onClick={closeMenu}
            >
              <svg className={styles.closeIcon} aria-hidden="true" focusable="false">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>

            <nav className={styles.modalNav}>
              {links.map((link) => (
                <Link
                  key={`modal-${link.href}`}
                  href={link.href}
                  className={styles.modalNavLink}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={styles.modalDivider} />

            <div className={styles.modalToggleWrap}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
