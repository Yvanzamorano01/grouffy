# Grouffy — Next.js Frontend (App Router, TS, Tailwind)

This is a clean Next.js 14 scaffold prepared to replace your previous Vite + React setup.

## What’s included
- **Next.js 14 (App Router)** with TypeScript
- **Tailwind CSS**
- Minimal **top navigation** for routes: `/`, `/businesses`, `/products`, `/groups`, `/chat`
- Example API route: `GET /api/health` returns `{ status: "ok" }`
- `.env.example` with `NEXT_PUBLIC_API_URL` placeholder

## Getting started
```bash
# install deps
npm i

# dev
npm run dev

# production
npm run build && npm start
```

## Where to put your code
- Pages live under **`app/`**. Each route has a `page.tsx`:
  - `app/page.tsx` → `/`
  - `app/businesses/page.tsx` → `/businesses`
  - `app/products/page.tsx` → `/products`
  - `app/groups/page.tsx` → `/groups`
  - `app/chat/page.tsx` → `/chat`
- Shared UI goes in **`components/`** (see `components/SiteNav.tsx`).

## Porting tips from Vite project
- **Assets**: move any static files (logos, images) into **`public/`**.
- **Environment vars**:
  - Client-side values should be prefixed with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_API_URL`).
- **Routing**: Replace `react-router-dom` with file-based routes in `app/`. Use `next/link` and `next/navigation`.
- **Styles**: Tailwind is set up in `app/globals.css` and `tailwind.config.ts`.

## Talking to your future backend (TypeScript + MongoDB)
When your backend is ready, use standard fetch calls in **Server Components**, **Route Handlers** (`app/api/...`), or **Client Components**. Example client-side fetch:

```tsx
const base = process.env.NEXT_PUBLIC_API_URL;

export async function getBusinesses() {
  const res = await fetch(`${base}/businesses`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
```

## Notes
- This scaffold favors clean, minimal UI. You can add shadcn/ui later with the official CLI if you want component primitives.
- If you had a `public/` or `src/assets/` folder in Vite, those files were copied if present.
