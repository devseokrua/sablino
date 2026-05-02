'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

type ThemeToggleProps = {
  className?: string;
};

const emptySubscribe = () => () => {};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const currentTheme = resolvedTheme ?? theme ?? 'light';
  const isDark = currentTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  const composedClassName = [styles.toggle, isDark ? styles.dark : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  if (!mounted) {
    return (
      <button
        type="button"
        className={[styles.toggle, className ?? ''].filter(Boolean).join(' ')}
        aria-label="Увімкнути темну тему"
        aria-pressed={false}
      >
        <span className={styles.thumb}>
          <Sun className={styles.icon} aria-hidden="true" focusable="false" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={composedClassName}
      onClick={() => setTheme(nextTheme)}
      aria-label={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
      aria-pressed={isDark}
    >
      <span className={styles.thumb}>
        {isDark ? (
          <Moon className={styles.icon} aria-hidden="true" focusable="false" />
        ) : (
          <Sun className={styles.icon} aria-hidden="true" focusable="false" />
        )}
      </span>
    </button>
  );
}
