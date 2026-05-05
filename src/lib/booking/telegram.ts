export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Missing Telegram environment variables');
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error('Telegram sendMessage failed');
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error('Telegram sendMessage failed');
  }
}
