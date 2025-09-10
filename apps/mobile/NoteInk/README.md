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

To see app running you can also download apk from the link [here](https://drive.google.com/drive/folders/11fO6iLtXGjIXxRHin3Zce9r1q16xrk-s?usp=sharing) -- only for android.  

  
## How to setUp Code  
1. Navigate to the mobile app directory:

   ```bash
   cd ./apps/mobile/NoteInk
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `mobile/NoteInk` directory and add your Gemini API key:

   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

   This will launch the mobile app in development mode. You can scan the QR code with the Expo Go app on your mobile device or run it on an emulator.

For further details you can visit expo documentaion [here](https://docs.expo.dev/)
   
# Your Contribution  
Your contribution even it is push, pull request or anything will help us in improving our product.  
Please Feel free to contrbute!