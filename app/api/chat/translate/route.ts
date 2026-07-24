import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  let originalText = "";

  try {
    const { text, language } = await req.json();

    originalText = text;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "system",
          content:
            "Translate the given text naturally for elderly users. Keep it simple.",
        },
        {
          role: "user",
          content: `Translate this into ${language}: ${text}`,
        },
      ],
    });

    return NextResponse.json({
      translation: response.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json(
      { translation: originalText },
      { status: 500 }
    );
  }
}