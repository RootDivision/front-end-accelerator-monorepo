import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface ChatMessage {
  content: string;
  role: 'assistant' | 'system' | 'user';
}

export async function POST(req: Request) {
  console.log('hahah', process.env.OPENAI_API_KEY);
  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  const result = streamText({
    messages,
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant.',
    tools: {
      weather: tool({
        description: 'Get the weather in a location (fahrenheit)',
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);

          return Promise.resolve({
            location,
            temperature,
          });
        },
        parameters: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
      }),
    },
  });

  return result.toDataStreamResponse();
}
