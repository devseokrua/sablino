'use client';

import { useEffect } from 'react';
import styles from './BookingSuccessToast.module.css';

type BookingSuccessToastProps = {
  isVisible: boolean;
  message: string;
  onHideAction: () => void;
};

export default function BookingSuccessToast({
  isVisible,
  message,
  onHideAction,
}: BookingSuccessToastProps) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onHideAction();
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, onHideAction]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.root} role="status" aria-live="polite">
      {message}
    </div>
  );
}
