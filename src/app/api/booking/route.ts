import { NextResponse } from 'next/server';

import { bookingSchema } from '@/lib/booking/booking.schema';
import { getBookingRateLimit, getClientIp } from '@/lib/booking/rate-limit';
import { formatBookingMessage } from '@/lib/booking/sanitize';
import { sendTelegramMessage } from '@/lib/booking/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { ok: false, error: 'unsupported_media_type' },
      { status: 415 },
    );
  }

  try {
    const rateLimit = getBookingRateLimit();
    const ip = getClientIp(request);
    const rateLimitResult = await rateLimit.limit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        { status: 429 },
      );
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
    }

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'invalid_data',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const message = formatBookingMessage(parsed.data);
    await sendTelegramMessage(message);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Missing Upstash Redis environment variables') {
        console.error('Booking API misconfigured: missing Upstash Redis variables');
        return NextResponse.json(
          { ok: false, error: 'server_misconfigured' },
          { status: 500 },
        );
      }

      if (error.message === 'Missing Telegram environment variables') {
        console.error('Booking API misconfigured: missing Telegram variables');
        return NextResponse.json(
          { ok: false, error: 'server_misconfigured' },
          { status: 500 },
        );
      }

      if (error.message === 'Telegram sendMessage failed') {
        console.error('Booking API failed: Telegram sendMessage request failed');
        return NextResponse.json(
          { ok: false, error: 'telegram_failed' },
          { status: 502 },
        );
      }

      console.error('Booking API failed:', error.message);
    }

    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
