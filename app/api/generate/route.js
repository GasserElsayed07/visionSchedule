import { NextResponse } from 'next/server';

export async function POST(req) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'OpenAI API key not set.' }, { status: 500 });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini', 
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that creates detailed, practical schedules based on user prompts.',
                },
                {
                    role: 'user',
                    content: `Create a detailed schedule based on this prompt: ${prompt}. Format it in raw Markdown suitable for direct display in a Markdown renderer, but do not wrap it in triple backticks.`,
                },
            ],
            max_tokens: 800,
            temperature: 0.7,
        }),
    });

    if (!openaiRes.ok) {
        const error = await openaiRes.text();
        return NextResponse.json({ error }, { status: openaiRes.status });
    }

    const data = await openaiRes.json();
    const schedule = data.choices?.[0]?.message?.content || 'No schedule generated.';

    return NextResponse.json({ schedule });
}