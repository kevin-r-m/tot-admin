import OpenAI from 'openai';

const openai = new OpenAI({
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
    project: import.meta.env.VITE_OPENAI_PROJ_ID,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function getAIDescription(name: string) {
    try {
        const thread = await startThread();
        await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: name,
        });

        return openai.beta.threads.runs.stream(thread.id, {
            assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
        });
    } catch (error) {
        console.error('Error in getAI function:', error);
    }
}

export function startThread() {
    return openai.beta.threads.create();
}
