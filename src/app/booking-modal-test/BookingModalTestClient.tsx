'use client';

import { useState } from 'react';

import BookingModal from '@/components/booking/BookingModal';
import Button from '@/components/ui/button/Button';

import styles from './BookingModalTest.module.css';

export default function BookingModalTestClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Тест модалки бронювання</h1>
        <p className={styles.description}>
          Ця сторінка потрібна тільки для перевірки BookingModal. Вона не
          підключає модалку до кнопок на сайті.
        </p>

        <Button type="button" onClick={() => setIsOpen(true)} className={styles.button}>
          Відкрити тестову модалку
        </Button>
      </div>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
