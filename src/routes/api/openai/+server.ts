import { json, type RequestEvent } from '@sveltejs/kit'
import OpenAI from 'openai'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

const client = new SecretManagerServiceClient();

async function getSecretValue(secretName: string) {
    try {
        const [version] = await client.accessSecretVersion({
            name: `projects/437428581435/secrets/${secretName}/versions/latest`, // This project number matches the one from the image
        });
        const secretPayload = version.payload?.data?.toString();
        if (!secretPayload) throw new Error(`Secret ${secretName} has no payload`);
        return secretPayload;
    } catch (error) {
        console.error(`Error fetching secret ${secretName}:`, error);
        throw new Error('Failed to retrieve API key from Secret Manager');
    }
}

export async function POST({ request }: RequestEvent) {
    try {
        const apiKey = await getSecretValue('openai-api-key')

        const openai = new OpenAI({
            apiKey: apiKey
        })

        const { messages } = await request.json()

        const stream = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Always respond in Markdown format. Avoid using triple backticks for code blocks. Use more business type emojis sparingly.' },
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
    } catch (error) {
        console.error('Error communicating with OpenAI:', error)
        return json({ error: 'Failed to communicate with OpenAI' }, { status: 500 })
    }
}
