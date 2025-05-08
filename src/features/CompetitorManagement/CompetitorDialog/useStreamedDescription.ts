import { useRef, useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
    project: import.meta.env.VITE_OPENAI_PROJ_ID,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export function useStreamedDescription() {
    const [description, setDescription] = useState('');
    const [streamLoading, setStreamLoading] = useState(false);
    const threadRef = useRef<Awaited<ReturnType<typeof openai.beta.threads.create>> | null>(null);

    async function startThread() {
        threadRef.current = await openai.beta.threads.create();
    }

    async function streamDescription(name: string) {
        if (!threadRef.current) {
            await startThread();
        }
        if (!threadRef.current) {
            return;
        }
        setStreamLoading(true);
        const stream = await openai.beta.threads.runs.stream(threadRef.current.id, {
            assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
        });

        await openai.beta.threads.messages.create(threadRef.current.id, {
            role: 'user',
            content: name,
        });

        stream.on('textDelta', (delta: { value?: string }) => {
            setDescription((prev) => prev + delta.value);
        });

        stream.done().then(() => setStreamLoading(false));
    }

    const resetStream = () => {
        setDescription('');
        setStreamLoading(false);
    };

    return { description, streamLoading, streamDescription, resetStream };
}
