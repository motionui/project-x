import OpenAI from 'openai';

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}

export async function generateText(
  prompt: string,
  options?: { maxTokens?: number; system?: string }
): Promise<string> {
  const openai = getClient();

  const system =
    options?.system ??
    'Respond with a single concise sentence. No extra commentary.';
  const maxTokens = options?.maxTokens ?? 80;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt },
    ],
    max_tokens: maxTokens,
  });

  return response.choices[0].message.content ?? '';
}
