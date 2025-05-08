import OpenAI from 'openai';

const openai = new OpenAI({
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
    project: import.meta.env.VITE_OPENAI_PROJ_ID,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function getAIDescription(name: string) {
    try {
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: name,
        });

        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
        });

        if (run.status === 'completed') {
            const latestMessage = await openai.beta.threads.messages.list(run.thread_id);

            if (latestMessage && latestMessage.data.length > 0) {
                // @ts-expect-error says this is wrong but it is correct
                return latestMessage.data[0].content[0].text.value;
            }
        }
    } catch (error) {
        console.error('Error in getAI function:', error);
    }
}
