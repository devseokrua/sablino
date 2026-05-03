const fallbackSiteUrl = 'https://sablino.vercel.app';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl
).replace(/\/$/, '');
