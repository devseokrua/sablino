'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './BookingForm.module.css';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  date: string;
  comment: string;
  website: string;
};

type Status = {
  type: 'success' | 'error';
  message: string;
} | null;

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  date: '',
  comment: '',
  website: '',
};

const SUCCESS_MESSAGE = 'Заявку надіслано. Ми зв’яжемося з вами для підтвердження.';
const GENERIC_ERROR_MESSAGE =
  'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.';
const RATE_LIMIT_MESSAGE = 'Забагато спроб. Спробуйте ще раз через хвилину.';
const VALIDATION_ERROR_MESSAGE = 'Перевірте правильність заповнення форми.';

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let responseBody: { error?: string } | null = null;
      try {
        responseBody = (await response.json()) as { error?: string };
      } catch {
        responseBody = null;
      }

      if (response.ok) {
        setStatus({ type: 'success', message: SUCCESS_MESSAGE });
        setFormData({ ...initialFormData, website: formData.website });
        return;
      }

      if (response.status === 429 || responseBody?.error === 'rate_limited') {
        setStatus({ type: 'error', message: RATE_LIMIT_MESSAGE });
        return;
      }

      if (response.status === 400 && responseBody?.error === 'invalid_data') {
        setStatus({ type: 'error', message: VALIDATION_ERROR_MESSAGE });
        return;
      }

      setStatus({ type: 'error', message: GENERIC_ERROR_MESSAGE });
    } catch {
      setStatus({ type: 'error', message: GENERIC_ERROR_MESSAGE });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.namesRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="firstName">
            Ім’я
          </label>
          <input
            className={styles.input}
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="lastName">
            Прізвище
          </label>
          <input
            className={styles.input}
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="phone">
          Телефон
        </label>
        <input
          className={styles.input}
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="date">
          Дата
        </label>
        <input
          className={styles.input}
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="comment">
          Коментар
        </label>
        <textarea
          className={styles.textarea}
          id="comment"
          name="comment"
          rows={5}
          value={formData.comment}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Надсилання...' : 'Надіслати заявку'}
      </button>

      {status ? (
        <p
          className={status.type === 'success' ? styles.successMessage : styles.errorMessage}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
