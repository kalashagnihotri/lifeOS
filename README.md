# LifeOS

LifeOS is a modular productivity system built with React and Vite.

## Prerequisites

- Node.js 18+
- npm
- Firebase project with Google authentication enabled

## Install

```bash
npm install
```

## Firebase Authentication Setup

1. Open Firebase Console and go to Authentication.
2. Enable the Google sign-in provider.
3. Open Project Settings and copy Web app config values.
4. Update `.env` in project root with your Firebase values.

Required environment variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_GEMINI_API_KEY=
```

Use `.env.example` as the template.

## Run (Development)

```bash
npm run dev
```

Then open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```
