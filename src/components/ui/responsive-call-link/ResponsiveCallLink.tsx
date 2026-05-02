import type { ReactNode } from 'react';
import Button from '@/components/ui/button/Button';
import styles from './ResponsiveCallLink.module.css';

type ResponsiveCallLinkProps = {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

const phoneHref = 'tel:+380967566091';
const contactsHref = '/#contacts';

export default function ResponsiveCallLink({
  className,
  children,
  ariaLabel,
}: ResponsiveCallLinkProps) {
  const composedClassName = className
    ? `${styles.link} ${className}`
    : styles.link;

  return (
    <>
      <Button
        href={phoneHref}
        className={`${composedClassName} ${styles.mobileLink}`}
        aria-label={ariaLabel}
      >
        {children}
      </Button>

      <Button
        href={contactsHref}
        className={`${composedClassName} ${styles.desktopLink}`}
        aria-label={ariaLabel}
      >
        {children}
      </Button>
    </>
  );
}
