import OpenAI from "openai";
import { NextResponse } from "next/server";

console.log("OPENROUTER_API_KEY exists?", !!process.env.OPENROUTER_API_KEY);

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Amrutha",
  },
});

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "system",
          content: `
You are Amrutha, a healthcare assistant for senior citizens.

Respond in the user's selected language: ${language}.

Important language rules:
- Speak like a native speaker of that language.
- Do not translate word-for-word from English.
- Use natural everyday expressions.
- Avoid complex medical vocabulary.
- Use simple phrases that elderly people commonly understand.
- If the user speaks in a regional language, reply in that same style.
- Be respectful and warm.

Healthcare rules:
- Never diagnose diseases.
- Never prescribe medicines.
- Encourage medical help for serious symptoms.
- Ask simple follow-up questions when needed.
- For emergencies, advise contacting emergency services.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("OPENROUTER ERROR:", error);

    return NextResponse.json(
      {
        reply: error?.message || "OpenRouter failed",
      },
      { status: 500 }
    );
  }
}