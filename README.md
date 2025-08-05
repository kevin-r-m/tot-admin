# This or That Admin Interface

An admin tool for interacting with the backend for [This or That](https://this-or-that.app/competition).

> **Note:** The backend is not currently exposed to the public. This admin tool is intended for internal use only. Visibility is for demonstration and portfolio showcase purposes.

### Features

#### Competitor Operations

Perform basic CRUD operations on competitors.

-   Creating new competitor records
-   Modifying existing competitor records
-   Assigning gifs to competitors

#### AI Interactions

The admin interface exposes interactions with OpenAI to assist in new competitor generation.

All AI computations are done on the backend and streamed (where applicable) to the frontend.
We utilize custom assistants via the OpenAI API. Conversation threads are created and saved to our database to improve context retention and reduce duplicative generations. Threads do have an expiration date, on that expiration new threads are created and saved.

### Libraries

-   OpenAI API
-   TanStack Query
-   GIPHY
-   Material UI
