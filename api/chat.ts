/// <reference types="node" />

import { GoogleGenAI, type Content } from '@google/genai';

export const config = { runtime: 'nodejs' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: { messages: { role: string; content: string }[]; query: string; systemPrompt?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, query, systemPrompt } = body;
  if (!query || typeof query !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Missing query' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const contents: Content[] = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  try {
    const result = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: systemPrompt
          ? { role: 'system', parts: [{ text: systemPrompt }] }
          : undefined,
        temperature: 0.3,
        maxOutputTokens: 1024,
      },
    });

    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const pump = async () => {
          try {
            for await (const chunk of result) {
              const text = chunk.text;
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            }
          } catch {
            // Stream ended or errored silently
          } finally {
            controller.close();
          }
        };
        void pump();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Gemini API error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
