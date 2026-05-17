import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/ai-chat-context';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = 'claude-haiku-4-5';
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 1500;
const MAX_HISTORY_TO_SEND = 8;
const MAX_OUTPUT_TOKENS = 512;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function validateMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) {
    return null;
  }
  const messages: ChatMessage[] = [];
  for (const m of input) {
    if (typeof m !== 'object' || m === null) return null;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string' || content.length === 0 || content.length > MAX_MESSAGE_CHARS) {
      return null;
    }
    messages.push({ role, content });
  }
  if (messages[0].role !== 'user') return null;
  return messages;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('Chat not configured', { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const messages = validateMessages((body as { messages?: unknown })?.messages);
  if (!messages) {
    return new Response('Invalid messages', { status: 400 });
  }

  let systemPrompt: string;
  let client: Anthropic;
  try {
    systemPrompt = await buildSystemPrompt();
    client = new Anthropic();
  } catch (err) {
    console.error('[chat] setup failed:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Setup error: ${msg}`, { status: 500 });
  }

  const trimmedMessages =
    messages.length > MAX_HISTORY_TO_SEND
      ? messages.slice(-MAX_HISTORY_TO_SEND)
      : messages;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const apiStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          system: [
            {
              type: 'text',
              text: systemPrompt,
              cache_control: { type: 'ephemeral' },
            },
          ],
          messages: trimmedMessages,
        });

        for await (const event of apiStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error('[chat] stream error:', err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
