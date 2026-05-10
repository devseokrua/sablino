import type { BookingInput } from './booking.schema';

export function sanitizeForTelegram(value: string): string {
  return value
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizePhoneForTelegram(value: string): string {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('380') && digits.length === 12) {
    return `+${digits}`;
  }

  if (digits.startsWith('0') && digits.length === 10) {
    return `+38${digits}`;
  }

  if (digits.length === 9) {
    return `+380${digits}`;
  }

  return digits ? `+${digits}` : '-';
}

export function formatBookingMessage(data: BookingInput): string {
  const name = sanitizeForTelegram(data.name);
  const phone = normalizePhoneForTelegram(data.phone);
  const checkInDate = sanitizeForTelegram(data.checkInDate);
  const checkOutDate = sanitizeForTelegram(data.checkOutDate);
  const comment = sanitizeForTelegram(data.comment ?? '') || '-';

  const createdAt = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());

  return [
    'Нова заявка на бронювання',
    `Ім’я та прізвище: ${name}`,
    `Телефон: ${phone}`,
    `Дата заїзду: ${checkInDate}`,
    `Дата виїзду: ${checkOutDate}`,
    `Коментар: ${comment}`,
    `Створено: ${createdAt}`,
  ].join('\n');
}
