import { z } from 'zod';

const nameRegex = /^[\p{L}'’ʼ -]+$/u;
const phoneRegex = /^[0-9+()\s-]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function isValidCalendarDate(value: string): boolean {
  const [yearRaw, monthRaw, dayRaw] = value.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return false;
  }

  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function isNotEarlierThanUtcToday(value: string): boolean {
  const todayUtc = new Date().toISOString().slice(0, 10);
  return value >= todayUtc;
}

export const bookingSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я не може бути довшим за 50 символів")
    .regex(
      nameRegex,
      "Ім'я може містити лише українські або латинські літери, пробіли, апостроф і дефіс"
    ),
  lastName: z
    .string()
    .trim()
    .min(2, 'Прізвище має містити щонайменше 2 символи')
    .max(50, 'Прізвище не може бути довшим за 50 символів')
    .regex(
      nameRegex,
      'Прізвище може містити лише українські або латинські літери, пробіли, апостроф і дефіс'
    ),
  phone: z
    .string()
    .trim()
    .min(7, 'Номер телефону має містити щонайменше 7 символів')
    .max(20, 'Номер телефону не може бути довшим за 20 символів')
    .regex(
      phoneRegex,
      'Номер телефону може містити лише цифри, пробіли та символи + - ( )'
    ),
  date: z
    .string()
    .trim()
    .regex(dateRegex, 'Дата має бути у форматі YYYY-MM-DD')
    .refine(isValidCalendarDate, 'Вкажіть коректну календарну дату')
    .refine(isNotEarlierThanUtcToday, 'Дата не може бути раніше поточної дати'),
  comment: z
    .string()
    .trim()
    .max(500, 'Коментар не може бути довшим за 500 символів')
    .optional()
    .default(''),
  website: z
    .string()
    .trim()
    .max(200, 'Поле website не може бути довшим за 200 символів')
    .optional()
    .default(''),
});

export type BookingInput = z.infer<typeof bookingSchema>;
