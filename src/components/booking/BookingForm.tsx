'use client';

import { ChangeEvent, FormEvent, useId, useMemo, useRef, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { uk } from 'react-day-picker/locale';

import Button from '@/components/ui/button/Button';
import styles from './BookingForm.module.css';

type FormData = {
  name: string;
  phone: string;
  comment: string;
  website: string;
};

type Status = {
  type: 'success' | 'error';
  message: string;
} | null;

type FieldErrors = {
  name?: string;
  phone?: string;
  dates?: string;
};

type BookingFormProps = {
  onSuccess?: () => void;
};

const initialFormData: FormData = {
  name: '',
  phone: '',
  comment: '',
  website: '',
};

const GENERIC_ERROR_MESSAGE =
  'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.';
const RATE_LIMIT_MESSAGE = 'Забагато спроб. Спробуйте ще раз через хвилину.';
const VALIDATION_ERROR_MESSAGE = 'Перевірте правильність заповнення форми.';
const NAME_REQUIRED_ERROR_MESSAGE = 'Вкажіть ім’я та прізвище.';
const NAME_INVALID_ERROR_MESSAGE = 'Вкажіть ім’я та прізвище повністю.';
const PHONE_REQUIRED_ERROR_MESSAGE = 'Вкажіть номер телефону.';
const PHONE_FORMAT_ERROR_MESSAGE =
  'Телефон повинен бути написаний у форматі +хх ххх ххх ххх.';
const DATE_RANGE_REQUIRED_ERROR_MESSAGE = 'Оберіть дати заїзду та виїзду.';
const DATE_RANGE_INCOMPLETE_ERROR_MESSAGE = 'Оберіть дату заїзду та дату виїзду.';
const PHONE_ALLOWED_CHARS_PATTERN = /^\+[0-9()\s-]+$/;
const PHONE_NORMALIZED_PATTERN = /^\+\d{9,15}$/;

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

function isValidRange(from: Date, to: Date): boolean {
  return stripTime(to).getTime() > stripTime(from).getTime();
}

function validateName(value: string): string | undefined {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return NAME_REQUIRED_ERROR_MESSAGE;
  }

  const words = trimmedValue.split(/\s+/).filter(Boolean);
  if (trimmedValue.length < 5 || words.length < 2) {
    return NAME_INVALID_ERROR_MESSAGE;
  }

  return undefined;
}

function validatePhone(value: string): string | undefined {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return PHONE_REQUIRED_ERROR_MESSAGE;
  }

  if (!PHONE_ALLOWED_CHARS_PATTERN.test(trimmedValue)) {
    return PHONE_FORMAT_ERROR_MESSAGE;
  }

  const normalizedValue = trimmedValue.replace(/[\s()-]/g, '');
  if (!PHONE_NORMALIZED_PATTERN.test(normalizedValue)) {
    return PHONE_FORMAT_ERROR_MESSAGE;
  }

  return undefined;
}

function validateDateRange(range: DateRange | undefined): string | undefined {
  if (!range?.from && !range?.to) {
    return DATE_RANGE_REQUIRED_ERROR_MESSAGE;
  }

  if (!range?.from || !range?.to) {
    return DATE_RANGE_INCOMPLETE_ERROR_MESSAGE;
  }

  if (!isValidRange(range.from, range.to)) {
    return DATE_RANGE_INCOMPLETE_ERROR_MESSAGE;
  }

  return undefined;
}

function hasErrors(errors: FieldErrors): boolean {
  return Boolean(errors.name || errors.phone || errors.dates);
}

function validateFields(
  name: string,
  phone: string,
  selectedRange: DateRange | undefined
): FieldErrors {
  return {
    name: validateName(name),
    phone: validatePhone(phone),
    dates: validateDateRange(selectedRange),
  };
}

function updateFieldError(
  previousErrors: FieldErrors,
  field: keyof FieldErrors,
  error: string | undefined
): FieldErrors {
  if (!error && !previousErrors[field]) {
    return previousErrors;
  }

  return { ...previousErrors, [field]: error };
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const nameErrorId = useId();
  const phoneErrorId = useId();
  const datesErrorId = useId();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [hasSubmitAttempt, setHasSubmitAttempt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const today = useMemo(() => stripTime(new Date()), []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (status?.type === 'error') {
      setStatus(null);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name' && (hasSubmitAttempt || fieldErrors.name)) {
      setFieldErrors((prev) => updateFieldError(prev, 'name', validateName(value)));
    }

    if (name === 'phone' && (hasSubmitAttempt || fieldErrors.phone)) {
      setFieldErrors((prev) => updateFieldError(prev, 'phone', validatePhone(value)));
    }
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (status?.type === 'error') {
      setStatus(null);
    }
    if (hasSubmitAttempt || fieldErrors.dates) {
      setFieldErrors((prev) => updateFieldError(prev, 'dates', validateDateRange(range)));
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(event);
    event.currentTarget.style.height = 'auto';
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const nextFieldErrors = validateFields(name, phone, selectedRange);

    setHasSubmitAttempt(true);
    setFieldErrors(nextFieldErrors);

    if (hasErrors(nextFieldErrors)) {
      setStatus(null);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const checkInDate = selectedRange?.from;
      const checkOutDate = selectedRange?.to;

      if (!checkInDate || !checkOutDate || !isValidRange(checkInDate, checkOutDate)) {
        setFieldErrors((prev) =>
          updateFieldError(prev, 'dates', DATE_RANGE_INCOMPLETE_ERROR_MESSAGE)
        );
        return;
      }

      const payload = {
        name,
        phone,
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
        setFormData((prev) => ({ ...initialFormData, website: prev.website }));
        setSelectedRange(undefined);
        setFieldErrors({});
        setHasSubmitAttempt(false);
        setStatus(null);
        if (commentTextareaRef.current) {
          commentTextareaRef.current.style.height = '';
        }
        onSuccess?.();
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
    : '';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="name">
          Ім’я та прізвище *{' '}
          <span className={styles.labelHint}>(обов&apos;язкове для заповнення)</span>
        </label>
        {fieldErrors.name ? (
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Напишіть своє ім'я та прізвище"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid="true"
            aria-describedby={nameErrorId}
          />
        ) : (
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Напишіть своє ім'я та прізвище"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid="false"
          />
        )}
        {fieldErrors.name ? (
          <p id={nameErrorId} className={styles.fieldError}>
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="phone">
          Телефон * <span className={styles.labelHint}>(обов&apos;язкове для заповнення)</span>
        </label>
        {fieldErrors.phone ? (
          <input
            className={styles.input}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Напишіть свій номер телефону у форматі +хх ххх ххх ххх"
            value={formData.phone}
            onChange={handleChange}
            required
            aria-invalid="true"
            aria-describedby={phoneErrorId}
          />
        ) : (
          <input
            className={styles.input}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Напишіть свій номер телефону у форматі +хх ххх ххх ххх"
            value={formData.phone}
            onChange={handleChange}
            required
            aria-invalid="false"
          />
        )}
        {fieldErrors.phone ? (
          <p id={phoneErrorId} className={styles.fieldError}>
            {fieldErrors.phone}
          </p>
        ) : null}
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.label}>
          Дати бронювання *{' '}
          <span className={styles.labelHint}>(оберіть дати заїзду та виїзду)</span>
        </p>
        <div className={styles.calendarWrap}>
          {fieldErrors.dates ? (
            <DayPicker
              mode="range"
              locale={uk}
              weekStartsOn={1}
              selected={selectedRange}
              onSelect={handleDateSelect}
              disabled={{ before: today }}
              showOutsideDays
              aria-invalid="true"
              aria-describedby={datesErrorId}
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
          ) : (
            <DayPicker
              mode="range"
              locale={uk}
              weekStartsOn={1}
              selected={selectedRange}
              onSelect={handleDateSelect}
              disabled={{ before: today }}
              showOutsideDays
              aria-invalid="false"
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
          )}
        </div>
        {fieldErrors.dates ? (
          <p id={datesErrorId} className={styles.fieldError}>
            {fieldErrors.dates}
          </p>
        ) : null}
        {rangeSummary ? <p className={styles.rangeSummary}>{rangeSummary}</p> : null}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="comment">
          Коментар
        </label>
        <textarea
          ref={commentTextareaRef}
          className={styles.textarea}
          id="comment"
          name="comment"
          rows={2}
          placeholder="Напишіть свій коментар"
          value={formData.comment}
          onChange={handleCommentChange}
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

      <Button className={styles.submitButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Надсилання...' : 'Надіслати заявку'}
      </Button>

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
