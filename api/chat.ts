/// <reference types="node" />

import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  try {
    const body = await req.json();

    const messages = body.messages ?? [];
    const query = body.query ?? "";
    const systemPrompt = body.systemPrompt ?? "";

    const finalMessages: any[] = [];

    if (systemPrompt) {
      finalMessages.push({
        role: "system",
        content: systemPrompt,
      });
    }

    if (messages.length > 0) {
      for (const msg of messages) {
        finalMessages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    } else {
      finalMessages.push({
        role: "user",
        content: query,
      });
    }

    const completion = await client.chat.completions.create({
      model: "qwen/qwen3-30b-a3b:free",
      messages: finalMessages,
      stream: true,
      temperature: 0.5,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices?.[0]?.delta?.content;

            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (error) {
          console.error("OpenRouter Stream Error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("OpenRouter Error:", error);

    return new Response(
      JSON.stringify({
        error: error?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}