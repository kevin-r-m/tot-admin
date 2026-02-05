# This or That Admin Interface

An admin tool for interacting with the backend for [This or That](https://this-or-that.app/competition).

> **Note:** An internal administration tool used to manage backend data and AI-assisted content generation for This or That. While the interface is visible for demonstration purposes, the admin and backend services themselves are not publicly available.

## Features

### Dashboard

The dashboard provides a consolidated view of real-time application activity, including:

- Current competition status
- Behavioral metrics (vote patterns, active competitor count, etc.)
- New competitor additions
- Quick actions and administrative alerts

Its purpose is to surface the overall health and state of the system at a glance.

![Admin Dashboard GIF](public/dashboard.gif)

### Competitor Management

Here, admins can create, update, deactivate, and inspect competitors.

- All competitor data is editable.
- “Deletion” is implemented as a soft delete to preserve data history.
- Bulk operations allow efficient onboarding during larger competitions.

AI-assisted flows are integrated directly into the interface:

- Streamed description generation during competitor creation/modification
- Bulk competitor generation (names + descriptions) to accelerate setup

![Competitor Management image](public/competitor-management.png)

### More on AI Interactions

The admin interface integrates with OpenAI’s Assistants API to generate and manage competitor content. All AI calls are made on the backend, so the frontend never directly touches the OpenAI API or exposes credentials.

There are two main AI workflows:

1. Streaming descriptions for a single competitor
2. Batch generation of multiple competitors with fuzzy matching against existing data

#### Thread Management & Expiration

To keep some conversational context without rebuilding prompts from scratch, the backend maintains one thread per assistant type (currently Describer and Generator).

A Thread document is stored in MongoDB with the OpenAI `threadId` and `assistantType`, for example:

```js
const Thread = new Schema(
    {
        threadId: { type: String, required: true },
        assistantType: {
            type: String,
            enum: ['Describer', 'Generator'],
            required: true,
        },
    },
    { timestamps: true, expireAfterSeconds: 2592000 }, // ~30 days
);
```

- timestamps: true adds createdAt / updatedAt.
- expireAfterSeconds: 2592000 (~30 days) means MongoDB automatically cleans up old thread documents.
- When a document expires, its associated OpenAI thread is no longer referenced by the app.

On each AI call, the backend:

1. Looks up an existing Thread for the given assistantType.
2. If none exists (or the old one has expired and been removed), it creates a new OpenAI thread and saves it.
3. Retrieves that thread from OpenAI and appends a new user message before kicking off a run.

The helper functions look roughly like:

```js
async function resolveThread(assistantType) {
    const threadDoc = await getOrCreateThread(assistantType);
    return openai.beta.threads.retrieve(threadDoc.threadId);
}

async function getOrCreateThread(assistantType) {
    let thread = await Thread.findOne({ assistantType });
    if (!thread) {
        const newThread = await openai.beta.threads.create();
        thread = new Thread({ threadId: newThread.id, assistantType });
        await thread.save();
    }
    return thread;
}
```

This keeps the context for each assistant type reasonably fresh while MongoDB handles automatic cleanup.

#### Streaming Single Competitor Descriptions

When an admin wants help writing or refining a competitor description, the backend uses a streaming run against the Describer assistant:

```js
export async function runDescriptionStream(value) {
    const thread = await resolveThread('Describer');

    await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: value,
    });

    return openai.beta.threads.runs.stream(thread.id, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID_DESCRIBER,
    });
}
```

Flow:

1. Resolve the Describer thread.
2. Append the admin’s input (value) as a user message.
3. Start a streaming run for the DESCRIBER assistant.
4. The route layer pipes the OpenAI stream back to the browser, so the description animates into the UI as it’s generated.

This keeps the experience responsive and lets the user see the description form in real time instead of waiting for a single blocking response.

![Admin Competitor Description AI Actions GIF](public/description_ai.gif)

#### Bulk Competitor Generation Pipeline

Bulk generation uses a separate Generator assistant and a structured, multi-step pipeline exposed via the /generateCompetitors endpoint:

```js
router.post('/generateCompetitors', async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

    const { value } = req.body;

    try {
        // Step 0 – initialization
        res.write(JSON.stringify({ step: 0, totalSteps: 2, data: [] }) + '\n');

        // Step 1 – call OpenAI and get raw generated competitors
        const output = await runCompetitorGeneration(value.toString());
        res.write(JSON.stringify({ step: 1, totalSteps: 2, data: [] }) + '\n');

        // Step 2 – parse and enrich with fuzzy matching
        const competitors = JSON.parse(output);
        const updatedCompetitors = await Promise.all(
            competitors.map(async (comp) => {
                const matched = await fuzzySearchCompetitors(comp.name);
                return {
                    ...comp,
                    competitorName: comp.name,
                    matchedCompetitor: matched[0]?.name || null,
                };
            }),
        );

        res.write(JSON.stringify({ step: 2, totalSteps: 2, data: updatedCompetitors }) + '\n');

        res.end();
    } catch (err) {
        console.error('Streaming error:', err);
        res.status(500).end('Error during streaming');
    }
});
```

What’s happening under the hood:

##### Chunked JSON response

The route uses Transfer-Encoding: chunked and writes newline-delimited JSON objects.
The frontend can subscribe to this response and show progress based on { step, totalSteps }:

- step: 0 → “Initializing / contacting AI”
- step: 1 → “AI response received, running fuzzy matching”
- step: 2 → Final enriched competitor payload

##### AI generation via Generator assistant

```js
export async function runCompetitorGeneration(numberOfCompetitors) {
    const thread = await resolveThread('Generator');

    await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: numberOfCompetitors,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID_GENERATOR,
    });

    if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(thread.id);

        const assistantMessagesForRun = messages.data.find((msg) => msg.role === 'assistant' && msg.run_id === run.id);

        return assistantMessagesForRun.content[0].text.value;
    }
}
```

- The assistant is instructed to return a JSON array of competitors.
- Once createAndPoll completes, the backend fetches the assistant message linked to that run and returns its text content.
- The route then calls JSON.parse(output) to turn that into an array of objects.

##### Fuzzy matching against existing competitors

To avoid accidentally re-creating very similar competitors, the backend runs a quick fuzzy lookup for each AI-generated name:

```js
const fuzzySearchCompetitors = async (searchTerm) => {
    const query = [
        {
            $search: {
                text: {
                    query: searchTerm,
                    path: 'name',
                },
            },
        },
        { $limit: 1 },
    ];

    try {
        return await Competitor.aggregate(query);
    } catch (error) {
        console.error('Error during fuzzy search:', error);
    }
};
```

- This uses MongoDB’s $search stage to find close matches on the name field.
- The best match (if any) is attached as matchedCompetitor.
- The final payload includes both the AI-generated competitor and any likely existing match, so the admin can decide whether to reuse or create new entries.

The end result is a guided, multi-step flow:

1. Ask AI for N competitors.
2. Parse the AI output as JSON.
3. Enrich it with fuzzy matches against your existing database.
4. Stream progress + results back to the UI in discrete steps.

![Admin Competitor AI Actions GIF](public/competitor_ai.gif)

## Libraries

- OpenAI API
- TanStack Query
- TanStack Router
- GIPHY API
- Material UI
- MUI X Charts

Material UI and MUI X Charts provide a fast path to building polished dashboards. TanStack Query provides rock-solid mutation handling and caching mechanics, keeping the admin UI responsive even during heavy updates.

Working with the OpenAI API is more involved. Validating structured outputs, interpreting assistant thread responses, managing streaming, and handling model quirks requires additional backend logic. But once the architecture is in place, it greatly enhances both productivity and creativity for admins.

TanStack Router offers excellent type-safety and composability, and its developer experience pairs naturally with TanStack Query. Together they make the admin interface feel stable and predictable, even during rapid iteration.
