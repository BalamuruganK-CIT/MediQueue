# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

## Using AI Features

This application uses Google's Generative AI. To enable AI-powered features like the Symptom Analysis tool, you need to provide a Google AI API key.

1.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Open the `.env` file in the root of this project.
3.  Add the following line, replacing `YOUR_API_KEY` with the key you obtained:

    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```

4.  The application will automatically pick up the key, and the AI features will be enabled.
