import { z } from 'zod';

const nameRegex = /^[\p{L}'’ʼ -]+$/u;
const phoneRegex = /^[0-9+()\s./-]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function hasValidPhoneDigits(value: string): boolean {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('380') && digits.length === 12) {
    return true;
  }

  if (digits.startsWith('0') && digits.length === 10) {
    return true;
  }

  if (digits.length === 9) {
    return true;
  }

  return digits.length >= 10 && digits.length <= 15;
}

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

const checkInDateSchema = z
  .string({ error: 'Оберіть дату заїзду' })
  .trim()
  .regex(dateRegex, 'Дата заїзду має бути у форматі YYYY-MM-DD')
  .refine(isValidCalendarDate, 'Вкажіть коректну дату заїзду')
  .refine(
    isNotEarlierThanUtcToday,
    'Дата заїзду не може бути раніше поточної дати'
  );

const checkOutDateSchema = z
  .string({ error: 'Оберіть дату виїзду' })
  .trim()
  .regex(dateRegex, 'Дата виїзду має бути у форматі YYYY-MM-DD')
  .refine(isValidCalendarDate, 'Вкажіть коректну дату виїзду')
  .refine(
    isNotEarlierThanUtcToday,
    'Дата виїзду не може бути раніше поточної дати'
  );

export const bookingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Ім’я та прізвище має містити щонайменше 2 символи')
      .max(100, 'Ім’я та прізвище не може бути довшим за 100 символів')
      .regex(
        nameRegex,
        'Ім’я та прізвище може містити лише українські або латинські літери, пробіли, апостроф і дефіс'
      ),
    phone: z
      .string()
      .trim()
      .min(7, 'Номер телефону має містити щонайменше 7 символів')
      .max(20, 'Номер телефону не може бути довшим за 20 символів')
      .regex(
        phoneRegex,
        'Номер телефону може містити лише цифри, пробіли та символи + - ( ) . /'
      )
      .refine(hasValidPhoneDigits, 'Вкажіть коректний номер телефону'),
    checkInDate: checkInDateSchema,
    checkOutDate: checkOutDateSchema,
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
  })
  .superRefine((data, ctx) => {
    if (data.checkOutDate < data.checkInDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Дата виїзду не може бути раніше дати заїзду',
        path: ['checkOutDate'],
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;
