# IdeaVault Client

> A community-driven startup idea sharing platform built with Next.js 14 (App Router), Tailwind CSS, Firebase Auth, and React Query.

**Live Site:** https://your-client.vercel.app  
**Server Repo:** https://github.com/your-username/ideavault-server

---

## ✨ Features

- 🚀 **Idea Sharing** — Submit startup ideas with title, description, category, tags, problem statement, and proposed solution
- 💬 **Comment System** — Add, edit, and delete comments on any idea; full CRUD with ownership checks
- 🔐 **Firebase Auth** — Email/password and Google OAuth login; JWT stored in localStorage for API calls
- 🔍 **Search & Filter** — Case-insensitive title search, category filter, sort by newest/oldest/popular, pagination
- 🌙 **Dark / Light Theme** — Globally toggled, persisted in localStorage
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- 🔒 **Private Routes** — Protected pages redirect to login; logged-in users stay on private routes after reload
- 🔖 **Bookmark System** — Save ideas to revisit later

---

## 🗂️ Folder Structure

```
ideavault-client/
├── public/
│   └── images/             ← Put local images here (accessible as /images/file.jpg)
├── src/
│   ├── app/                ← Next.js App Router pages
│   │   ├── (auth)/
│   │   │   ├── login/page.js
│   │   │   └── signup/page.js
│   │   ├── ideas/
│   │   │   ├── [id]/page.js     ← Idea detail page (private)
│   │   │   └── page.js          ← Browse all ideas (public)
│   │   ├── add-idea/page.js     ← Submit idea (private)
│   │   ├── my-ideas/page.js     ← My ideas + CRUD (private)
│   │   ├── my-interactions/page.js  ← My comment history (private)
│   │   ├── profile/page.js      ← Edit profile (private)
│   │   ├── layout.js            ← Root layout: Navbar, Footer, Providers
│   │   ├── page.js              ← Home page
│   │   ├── not-found.js         ← Custom 404 page
│   │   └── globals.css          ← Tailwind + custom component classes
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.js
│   │   │   ├── SignupForm.js
│   │   │   └── ProfilePage.js
│   │   ├── home/
│   │   │   ├── Banner.js           ← 3-slide banner with CTA
│   │   │   ├── TrendingIdeas.js    ← Top 6 ideas from API
│   │   │   ├── HowItWorks.js       ← 3-step section
│   │   │   ├── Newsletter.js       ← Email subscribe section
│   │   │   └── IdeaCard.js         ← Reusable idea card component
│   │   ├── ideas/
│   │   │   ├── IdeasPage.js        ← Grid + search + filter + pagination
│   │   │   ├── IdeaDetailPage.js   ← Full detail + like + comments
│   │   │   ├── AddIdeaForm.js      ← Multi-field form with validation
│   │   │   ├── MyIdeasPage.js      ← Cards + edit modal + delete modal
│   │   │   └── MyInteractionsPage.js
│   │   └── shared/
│   │       ├── Navbar.js           ← Sticky navbar, mobile menu, user dropdown
│   │       ├── Footer.js           ← Platform links, categories, social icons
│   │       ├── PrivateRoute.js     ← Redirects to /login if not authenticated
│   │       └── LoadingSpinner.js
│   ├── context/
│   │   ├── AuthProvider.js     ← Firebase auth state, JWT, theme toggle
│   │   └── QueryProvider.js    ← TanStack React Query setup
│   ├── hooks/
│   │   ├── useAuth.js          ← Access AuthContext values
│   │   └── useAxiosSecure.js   ← Axios instance with auto JWT header
│   └── lib/
│       ├── firebase.js         ← Firebase app initialization
│       └── axios.js            ← Public Axios instance (no auth header)
├── .env.local.example          ← Copy to .env.local and fill in values
├── next.config.mjs             ← Image remote patterns (Unsplash, Google, etc.)
├── tailwind.config.js
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

---

## 🔥 Prerequisites

Install these before starting:

| Tool | Download |
|------|----------|
| Node.js v18+ | https://nodejs.org |
| Git | https://git-scm.com |
| VS Code | https://code.visualstudio.com |

---

## 🔥 Step 1 — Firebase Setup (Free)

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `IdeaVault` → Continue (disable analytics is fine)
3. Click **Build → Authentication → Get started**
4. Under **Sign-in method**, enable:
   - ✅ **Email/Password** → Save
   - ✅ **Google** → add a support email → Save
5. Click the **`</>`** (Web) icon on the project overview to register your app
   - App nickname: `ideavault-client`
   - Don't enable Firebase Hosting (we use Vercel)
6. **Copy the `firebaseConfig` object** — you'll paste values into `.env.local`
7. Go to **Authentication → Settings → Authorized domains**
   - `localhost` is already there ✔
   - Add your Vercel domain after deployment (e.g. `ideavault-client.vercel.app`)

---

## 🍃 Step 2 — MongoDB Atlas Setup (Free)

1. Sign up at https://cloud.mongodb.com
2. **Create a free M0 cluster** (choose AWS, any region)
3. **Database Access → Add new database user:**
   - Username: `ideavaultAdmin`
   - Password: generate a strong one and save it
   - Role: **Atlas Admin**
4. **Network Access → Add IP Address → Allow access from anywhere** `0.0.0.0/0`
5. **Clusters → Connect → Drivers → Copy the connection string:**
   ```
   mongodb+srv://ideavaultAdmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` and insert the DB name before `?`:
   ```
   mongodb+srv://ideavaultAdmin:YourPass@cluster0.xxxxx.mongodb.net/ideavaultDB?retryWrites=true&w=majority
   ```

---

## ⚙️ Step 3 — Configure Environment Variables

```bash
cd ideavault-client
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

# From Firebase Console → Project Settings → Your Apps → SDK setup
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ideavault-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ideavault-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ideavault-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

> ⚠️ Never commit `.env.local` to GitHub — it's already in `.gitignore`

---

## 🚀 Step 4 — Run Locally

Make sure the server is running first (see server README), then:

```bash
cd ideavault-client
npm install
npm run dev
```

Open **http://localhost:3000** — your app is live!

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Hot-reload dev mode |
| Production build | `npm run build` | Build for production |
| Start production | `npm start` | Run built app |
| Lint | `npm run lint` | Run ESLint checks |

---

## 🖼️ Image Management

### Option A — Unsplash URLs (zero setup, recommended for development)

Browse https://unsplash.com, right-click any image → **Copy image address**.  
Paste the URL directly into the "Cover Image URL" field when adding an idea.

Example:
```
https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80
```

### Option B — ImgBB (free image hosting, 32MB limit)

1. Go to https://imgbb.com
2. Upload your image
3. Copy the **Direct link** (e.g. `https://i.ibb.co/xxx/myimage.jpg`)
4. Paste into the image URL field

### Option C — Cloudinary (recommended for production)

1. Sign up free at https://cloudinary.com
2. Upload → copy the URL (starts with `res.cloudinary.com`)
3. Already whitelisted in `next.config.mjs`

### Option D — Local Files

Place images in `public/images/` folder:
```
ideavault-client/
  public/
    images/
      hero.jpg
      tech-idea.jpg
```

Reference as `/images/hero.jpg` in the image URL field.

---

## 🌍 Deploy to Vercel

### 1. Push to GitHub

```bash
cd ideavault-client
git init
git add .
git commit -m "Initial commit: IdeaVault client"
git remote add origin https://github.com/YOUR_USERNAME/ideavault-client.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com → **New Project** → Import your GitHub repo
2. Framework preset: **Next.js** (auto-detected ✔)
3. Click **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Your deployed server URL (e.g. `https://ideavault-server.vercel.app`) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | From Firebase config |

4. Click **Deploy** → wait ~2 minutes → copy your `.vercel.app` URL

### 3. Add Domain to Firebase

Back in Firebase Console → **Authentication → Settings → Authorized domains** → **Add domain** → paste your Vercel URL (without `https://`)

---

## 📝 GitHub Commits (Assignment Requirement: 15+)

```bash
git commit -m "Initial project setup with Next.js 14 and Tailwind CSS"
git commit -m "Configure Firebase authentication (email + Google OAuth)"
git commit -m "Add AuthProvider context with JWT and theme toggle"
git commit -m "Build responsive Navbar with mobile menu and user dropdown"
git commit -m "Create Footer with platform links and social icons"
git commit -m "Build home page Banner with 3 auto-rotating slides"
git commit -m "Add TrendingIdeas section fetching top 6 from API"
git commit -m "Add HowItWorks and Newsletter extra sections"
git commit -m "Build ideas listing page with 3-column grid"
git commit -m "Implement search (regex), category filter, sort, and pagination"
git commit -m "Create idea detail page with full information display"
git commit -m "Implement comment system with add, edit, delete and timestamps"
git commit -m "Add like/unlike functionality on idea detail page"
git commit -m "Build Add Idea form with React Hook Form validation"
git commit -m "Create My Ideas page with edit modal and delete confirmation"
git commit -m "Add My Interactions page showing comment history"
git commit -m "Implement Profile page with name and photo update"
git commit -m "Add JWT-protected private routes and login redirect"
git commit -m "Polish: dark mode, loading spinners, toast notifications, 404"
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error in console | Server's `origin` array must include `http://localhost:3000` |
| Images not loading | Check `next.config.mjs` has the image hostname in `remotePatterns` |
| `auth/invalid-credential` | Wrong Firebase keys in `.env.local` |
| Blank page after deploy | Check all `NEXT_PUBLIC_*` env vars are set in Vercel dashboard |
| Private route redirects logged-in user | Ensure Firebase initialized before `onAuthStateChanged` fires |
| API 401 Unauthorized | Token missing — check `useAxiosSecure.js` is injecting the header |

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| Auth | Firebase Authentication |
| API calls | Axios + TanStack React Query |
| Forms | React Hook Form |
| Notifications | react-hot-toast |
| Icons | react-icons |
| Deployment | Vercel |
