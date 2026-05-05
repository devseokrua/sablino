import type { BookingInput } from './booking.schema';

export function sanitizeForTelegram(value: string): string {
  return value
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatBookingMessage(data: BookingInput): string {
  const firstName = sanitizeForTelegram(data.firstName);
  const lastName = sanitizeForTelegram(data.lastName);
  const phone = sanitizeForTelegram(data.phone);
  const date = sanitizeForTelegram(data.date);
  const comment = sanitizeForTelegram(data.comment ?? '') || '-';
  const siteUrl = sanitizeForTelegram(process.env.NEXT_PUBLIC_SITE_URL ?? '') || '-';

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
    `Ім'я: ${firstName}`,
    `Прізвище: ${lastName}`,
    `Телефон: ${phone}`,
    `Дата: ${date}`,
    `Коментар: ${comment}`,
    `Сайт: ${siteUrl}`,
    `Створено: ${createdAt}`,
  ].join('\n');
}
