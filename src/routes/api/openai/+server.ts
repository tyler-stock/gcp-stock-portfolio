import { json, type RequestEvent } from '@sveltejs/kit'
import OpenAI from 'openai'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

const client = new SecretManagerServiceClient();

async function getSecretValue() {
    try {
        const [version] = await client.accessSecretVersion({
            name: `projects/935976699376/secrets/VITE_OPENAI_API_KEY/versions/1`,
        });
        const secretPayload = version.payload?.data?.toString();
        if (!secretPayload) throw new Error(`Secret VITE_OPENAI_API_KEY has no payload`);
        return secretPayload;
    } catch (error) {
        console.error(`Error fetching secret VITE_OPENAI_API_KEY:`, error);
        throw new Error('Failed to retrieve API key from Secret Manager');
    }
}

export async function POST({ request }: RequestEvent) {
    try {
        const apiKey = await getSecretValue()

        const openai = new OpenAI({
            apiKey: apiKey
        })

        const { messages } = await request.json()

        const stream = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Always respond in Markdown format. Use more business type emojis sparingly.' },
                ...messages
            ],
            model: 'gpt-4o',
            stream: true,
        })

        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const part of stream) {
                    if (part.choices && part.choices[0].delta.content) {
                        const text = part.choices[0].delta.content
                        controller.enqueue(text)
                    }
                }
                controller.close()
            }
        })

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    } catch (error: any) {
        console.error('Error communicating with OpenAI:', error.message, error.stack);

        let errorMessage = 'Failed to communicate with OpenAI';

        if (error.message.includes('Failed to retrieve API key')) {
            errorMessage = 'Server configuration error. Please contact support.';
        } else if (error.message.includes('Invalid API key')) {
            errorMessage = 'Invalid API key. Please verify your API configuration.';
        }

        return json({ error: errorMessage }, { status: 500 });
    }
}