# NoteInk - AI-Powered Note-Taking App

Welcome to **NoteInk**, a modern AI-powered note-taking application built using a monorepo structure with **Next.js** for the web and **Expo** for the mobile application. NoteInk combines a sleek, user-friendly interface with an intelligent AI assistant to enhance your note-taking experience.

## Features

- **AI Assistant**: Leverage the power of an AI assistant to answer queries, summarize content, or assist with note organization.
- **Cross-Platform**: Seamless experience on both web and mobile platforms.
- **Simple UI**: Intuitive and accessible design, suitable for users of all levels.
- **Fast Setup**: Quick and easy setup for developers to get started with the codebase.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- A **Gemini API Key** (obtainable for free from Google AI Studio)

## Setup Instructions

To get started, clone the repository by running the following command in your terminal:

```
git clone https://github.com/Dawood-0007/AI-powered-Note-App-NoteInk.git
```

The repository contains two folders in the `apps` directory: one for the mobile app (`mobile/NoteInk`) and one for the web app (`web/noteink`).  
  
You can visit website to see the web version [here](https://noteink-web.vercel.app)

## How To setUp web code  

1. Navigate to the web app directory:

   ```bash
   cd ./apps/web/noteink
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `web/noteink` directory and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. Start the Next.js development server:

   ```bash
   npm run dev
   ```

   The web app should now be running on `http://localhost:3000` (or another port if specified).

For further details you can visit nextjs documentaion [here](https://nextjs.org/docs)  