💡 IdeaVault Client
A community-driven startup idea sharing platform built with Next.js 14 (App Router), Tailwind CSS, Firebase Auth, and React Query.

Live Deployment Site: [https://ideavault-client-kanok.vercel.app](https://ideavault-client-kanok.vercel.app) (Or your specific Vercel URL)

Backend API Repository: [https://github.com/KANOK508/ideavault-server](https://github.com/KANOK508/ideavault-server)

✨ Features
Idea Sharing Hub: Submit startup concepts detailing categories, tags, targeted problem statements, and your proposed solutions.

Comment Engagement System: Full conversational interaction panels that allow users to add, edit, or delete comments on any idea, complete with author validation.

Firebase Authentication Ecosystem: Secure account management featuring seamless Email/Password combinations alongside single-click Google OAuth login pathways.

Search & Structural Filtering: Case-insensitive phrase match filtering backed by category dropdown selects, multi-tier sorting rules, and smooth page breaks.

Persistent Theme Controls: Global dark and light display modes that intelligently persist user preferences directly inside local system storage.

Optimized Privacy Protection: Specialized routing blocks that intercept unauthenticated access attempts and safely shield active user sessions from breaking on page reloads.

Personalized Bookmarks Dashboard: Bookmark and store interesting startup ideas into a dedicated list to revisit later.

🗂️ Project Anatomy
Plaintext


ideavault-client/
├── public/                 ← Static asset bucket holding your local /images/
├── src/
│   ├── app/                ← Next.js App Router folders defining web directory pathways
│   ├── components/         ← Reusable UI blocks separated by home, ideas, and shared sections
│   ├── context/            ← React Context configurations setting up Auth and Query states
│   ├── hooks/              ← Custom hook files managing authorization checks and secure Axios configs
│   └── lib/                ← Initializers for standard core plugins like Firebase and base Axios
├── .env.local              ← Security environment configuration file (Hidden via Git)
├── next.config.mjs         ← Central Next.js engine rules specifying remote image asset hostnames
└── package.json            ← System script dependencies and project build requirements
🛠️ Local Development Setup
Get your local client instance running on your machine with these simple steps:

1. Download Dependencies
Bash


cd ideavault-client
npm install
2. Configure Local Environment Variables
Create a file named exactly .env.local in the root directory. Paste your clean Firebase credentials and connect your local server gateway:

Code snippet


NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBbfX_Qx-TSbPkcecJvg5NkiIWIfBpsCBg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ideavault-3835d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ideavault-3835d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ideavault-3835d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=146490870565
NEXT_PUBLIC_FIREBASE_APP_ID=1:146490870565:web:57147d016032dc47ef68cc
3. Start the Development Server
Bash


npm run dev
Open your browser and navigate to http://localhost:3000 to see your app live.

🖼️ Supported Image Hosting
When adding cover images to your startup ideas, you can use any of these straightforward options:

Unsplash URLs: Right-click an image on Unsplash and copy the link directly into your app.

ImgBB Hosting: Upload files to ImgBB and paste the provided Direct Link ending in .jpg or .png.

Cloudinary Storage: Upload assets to Cloudinary and use the generated res.cloudinary.com URL pathway.

Local Project Images: Drop your files inside /public/images/ and reference them directly in your forms as /images/your-file-name.jpg.

🌍 Quick Troubleshooting Reference
Images displaying broken placeholder blocks? Make sure the website domain hosting your image is listed in your next.config.mjs file under remotePatterns.

Encountering an auth/invalid-credential error? Take a close look at your .env.local parameters to ensure there are no missing characters or tiny typos in your Firebase configuration keys.

Getting bumped back to the login screen on page refresh? Verify that your React context logic allows your Firebase onAuthStateChanged hook to completely finish evaluating before your private route layout attempts to load.