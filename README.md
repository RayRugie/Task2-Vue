# Ticketa (Vue 3 + TypeScript)

A Vue 3 implementation of the Ticket Management app. It mirrors the layout/UX from the React version and follows the task’s rules for layout, responsiveness, and CRUD flows.

## Stack
- Vue 3 + Vite + TypeScript
- Vue Router
- Sass (SCSS)
- @supabase/supabase-js (data/auth helper)
- vue-toastification

## Getting Started
1. Install dependencies:
```bash
npm install
```
2. Run dev server:
```bash
npm run dev
```
3. Build for production:
```bash
npm run build
```

## Environment
Create a `.env` (or `.env.local`) with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Routing
- `/` Landing (public)
- `/auth/login` Login (public)
- `/auth/signup` Signup (public)
- `/dashboard` Dashboard (protected)
- `/tickets` Ticket Management (protected)

A global guard checks `localStorage.ticketapp_session`; unauthenticated users are redirected to `/auth/login`.

## Authentication (Simulated)
- On successful Login/Signup, the app sets `localStorage.ticketapp_session = 'true'` and redirects to the Dashboard.
- Logout clears the key and redirects to the Landing page.

## Tickets
- Full CRUD using a Supabase table named `tickets`.
- Required fields: title, status.
- Status values (per spec): `open`, `in_progress`, `closed`.
- Inline errors + toasts for validation and network issues.

## Design & Layout
- Max width 1440px centered on large screens.
- Landing hero includes wave SVG and an overlapping decorative circle.
- Card-style boxes for stats and tickets, responsive grid on tablet/desktop.
- Global focus-visible outline for accessibility.

## Accessibility
- Semantic headings, labeled forms with `role="form"` and ARIA states (`aria-invalid`, `aria-busy`).
- Color contrast and focus states considered in styles.

## Project Structure (key paths)
```
src/
  components/      # UI components (AuthForm, Header, Hero, TicketCard, TicketForm, ...)
  pages/           # Pages (Landing, Login, Signup, Dashboard, Tickets)
  styles/          # SCSS (base.scss, landing.scss, Tickets.scss, ...)
  utils/           # supabaseClient.ts, auth.ts
  router.ts        # Routes + auth guard
  main.ts          # App bootstrap
  App.vue          # Root view
```

## Example Credentials
- Any email/password can be used; session is simulated via localStorage.
email: admin@gmail.com
password: admin001

## Notes / Known Issues
- If you change the status enum, update it consistently in: `TicketForm.vue`, `TicketCard.vue`, `Tickets.vue`, and related SCSS classes.
- Ensure Supabase table columns match the fields used here (title, description, status, email, created_at, updated_at).

## Other Implementations
This repo contains separate implementations for React and Twig. Refer to their respective folders/READMEs for setup and parity details.
