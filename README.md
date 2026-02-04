# VIBE 💜

**"Know when they need you, before they have to ask."**

A trust-based Parent/Teen mental health app that helps families stay connected through gentle check-ins, mood tracking, and supportive resources.

## Features

### For Teens 🧑
- **Daily Mood Check-ins** — Quick emoji-based mood logging with optional notes
- **Private Journal** — Write freely (parents NEVER see the content)
- **Resources** — Crisis support, coping tools, boundaries education
- **SOS Button** — Instant access to crisis hotlines

### For Parents 👨‍👩‍👧
- **Emotional Weather Report** — See trends, not raw data
- **Mood Charts** — Visual overview of the past week
- **Smart Alerts** — Green/Yellow/Red status with guidance
- **Conversation Starters** — Ideas for connecting without pressure

## Privacy Model 🔐

| Data | Teen Sees | Parent Sees |
|------|-----------|-------------|
| Mood ratings | ✅ Full history | ✅ Trends only |
| Journal entries | ✅ Everything | ❌ Never |
| AI insights | ✅ Personal | ✅ Guidance |

**Trust is the foundation.**

## Tech Stack

- React Native (Expo)
- TypeScript
- Firebase (Auth, Firestore)
- NativeWind (TailwindCSS)

## Setup

### 1. Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Firebase project

### 2. Firebase Setup
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Create **Firestore Database**
4. Get your config from Project Settings

### 3. Configure Environment

Create `app/.env`:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Install & Run

```bash
cd app
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android).

## Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Family members can read family data
    match /families/{familyId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == resource.data.parentId;
    }
    
    // Check-ins: user can write own, family can read
    match /checkins/{checkinId} {
      allow write: if request.auth.uid == request.resource.data.userId;
      allow read: if request.auth != null;
    }
    
    // Journals: ONLY the owner can read/write (parents cannot see)
    match /journals/{journalId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Deployment

### Vercel (Web Preview)
```bash
npx expo export:web
# Deploy dist/ to Vercel
```

### App Stores
```bash
npx expo build:ios
npx expo build:android
```

## Mission

**No one should feel so alone that they want to disappear.**

Built with 💜 for families who want to stay connected.

---

## Coming Soon
- AI-powered sentiment analysis
- Family group chat
- Therapist directory integration
- School/counselor dashboard
