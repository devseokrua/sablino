'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { uk } from 'react-day-picker/locale';

import styles from './BookingForm.module.css';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
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
  comment: '',
  website: '',
};

const SUCCESS_MESSAGE = 'Заявку надіслано. Ми зв’яжемося з вами для підтвердження.';
const GENERIC_ERROR_MESSAGE =
  'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.';
const RATE_LIMIT_MESSAGE = 'Забагато спроб. Спробуйте ще раз через хвилину.';
const VALIDATION_ERROR_MESSAGE = 'Перевірте правильність заповнення форми.';
const DATE_RANGE_REQUIRED_MESSAGE = 'Оберіть дату заїзду та дату виїзду.';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function toYyyyMmDd(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toDdMmYyyy(date: Date): string {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isValidRange(range: DateRange | undefined): range is Required<DateRange> {
  if (!range?.from || !range?.to) {
    return false;
  }

  return stripTime(range.to).getTime() > stripTime(range.from).getTime();
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const today = useMemo(() => stripTime(new Date()), []);

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

    if (!isValidRange(selectedRange)) {
      setStatus({ type: 'error', message: DATE_RANGE_REQUIRED_MESSAGE });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const checkInDate = selectedRange.from;
      const checkOutDate = selectedRange.to;

      if (!checkInDate || !checkOutDate) {
        setStatus({ type: 'error', message: DATE_RANGE_REQUIRED_MESSAGE });
        return;
      }

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        checkInDate: toYyyyMmDd(checkInDate),
        checkOutDate: toYyyyMmDd(checkOutDate),
        comment: formData.comment,
        website: formData.website,
      };

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let responseBody: { error?: string } | null = null;
      try {
        responseBody = (await response.json()) as { error?: string };
      } catch {
        responseBody = null;
      }

      if (response.ok) {
        setStatus({ type: 'success', message: SUCCESS_MESSAGE });
        setFormData((prev) => ({ ...initialFormData, website: prev.website }));
        setSelectedRange(undefined);
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

  const rangeSummary = selectedRange?.from
    ? selectedRange.to
      ? `${toDdMmYyyy(selectedRange.from)} - ${toDdMmYyyy(selectedRange.to)}`
      : `${toDdMmYyyy(selectedRange.from)} - ...`
    : 'Оберіть дати заїзду та виїзду';

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
        <p className={styles.label}>Дати бронювання</p>
        <div className={styles.calendarWrap}>
          <DayPicker
            mode="range"
            locale={uk}
            weekStartsOn={1}
            selected={selectedRange}
            onSelect={setSelectedRange}
            disabled={{ before: today }}
            showOutsideDays
            labels={{
              labelNext: () => 'Наступний місяць',
              labelPrevious: () => 'Попередній місяць',
            }}
            classNames={{
              root: styles.calendarRoot,
              months: styles.calendarMonths,
              month: styles.calendarMonth,
              month_caption: styles.calendarCaption,
              caption_label: styles.calendarCaptionLabel,
              nav: styles.calendarNav,
              button_previous: styles.calendarNavButton,
              button_next: styles.calendarNavButton,
              month_grid: styles.calendarMonthGrid,
              weekdays: styles.calendarWeekdays,
              weekday: styles.calendarWeekday,
              weeks: styles.calendarWeeks,
              week: styles.calendarWeek,
              day: styles.calendarDay,
              day_button: styles.calendarDayButton,
              selected: styles.calendarSelected,
              range_start: styles.calendarRangeStart,
              range_middle: styles.calendarRangeMiddle,
              range_end: styles.calendarRangeEnd,
              disabled: styles.calendarDisabled,
              outside: styles.calendarOutside,
              today: styles.calendarToday,
            }}
          />
        </div>
        <p className={styles.rangeSummary}>{rangeSummary}</p>
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
