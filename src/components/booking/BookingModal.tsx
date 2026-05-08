'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import BookingForm from '@/components/booking/BookingForm';
import BookingSuccessToast from '@/components/common/BookingSuccessToast';

import styles from './BookingModal.module.css';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const titleId = useId();
  const subtitleId = useId();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleSuccess = useCallback(() => {
    setIsSuccessVisible(true);
    onClose();
  }, [onClose]);

  const handleToastHide = useCallback(() => {
    setIsSuccessVisible(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if ((!isOpen && !isSuccessVisible) || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      {isOpen ? (
        <div className={styles.root}>
          <button
            type="button"
            className={styles.overlay}
            onClick={onClose}
            aria-label="Закрити форму бронювання"
          />

          <div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={subtitleId}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрити форму бронювання"
            >
              <svg className={styles.closeIcon} aria-hidden="true" focusable="false">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>

            <div className={styles.header}>
              <h2 id={titleId} className={styles.title}>
                Заявка на бронювання
              </h2>
              <p id={subtitleId} className={styles.subtitle}>
                Оберіть дати та залиште контактні дані. Ми зв’яжемося з вами для
                підтвердження.
              </p>
            </div>

            <BookingForm onSuccess={handleSuccess} />
          </div>
        </div>
      ) : null}

      <BookingSuccessToast
        isVisible={isSuccessVisible}
        message="Заявку надіслано. Ми зв’яжемося з вами для підтвердження."
        onHide={handleToastHide}
      />
    </>,
    document.body
  );
}
