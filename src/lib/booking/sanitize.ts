import type { BookingInput } from './booking.schema';

export function sanitizeForTelegram(value: string): string {
  return value
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatBookingMessage(data: BookingInput): string {
  const name = sanitizeForTelegram(data.name);
  const phone = sanitizeForTelegram(data.phone);
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
