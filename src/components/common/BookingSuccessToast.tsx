'use client';

import { useEffect } from 'react';
import styles from './BookingSuccessToast.module.css';

type BookingSuccessToastProps = {
  isVisible: boolean;
  message: string;
  onHide: () => void;
};

export default function BookingSuccessToast({
  isVisible,
  message,
  onHide,
}: BookingSuccessToastProps) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onHide();
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, onHide]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.root} role="status" aria-live="polite">
      {message}
    </div>
  );
}
