# Dharshith.vercel.app

Production portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling, and backend routes for contact, analytics, and live profile data.

## Highlights

- Premium dark UI with glassmorphism navigation
- Smooth scrolling with full-section snap behavior
- Animated hero, project, assistant, and contact sections
- Live analytics and contact submission endpoints
- GitHub-backed profile insights with graceful fallback
- SEO metadata configured for the live domain

## Project Layout

```text
app/
  api/
  layout.tsx
  loading.tsx
  page.tsx
components/
data/
lib/
public/
```

## Local Setup

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Live Site

https://dharshith.vercel.app

Deploy directly to Vercel:

1. Push repository to GitHub
2. Import project in Vercel
3. Set optional `HF_API_TOKEN` and `HF_MODEL` env vars
4. Deploy

## AI Assistant Design

- API endpoint: `POST /api/assistant`
- Local intent detection based on keyword matching
- Structured responses from portfolio data
- If local intent is unknown, optional Hugging Face fallback triggers
- If Hugging Face fails, response gracefully falls back to local assistant
