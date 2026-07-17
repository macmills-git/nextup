
## Goal

Ship end-to-end auth, database, and AI for the app. Runtime split:

- **Lovable Cloud (Supabase)** → auth (email + managed Google) and Postgres/RLS for all app data.
- **`backend/` (standalone Node)** → the AI runtime (OpenRouter, BullMQ queue, SSE streaming, vendor embeddings). Deployed by you; the frontend reaches it via `VITE_BACKEND_URL`.

## 1. Enable Lovable Cloud

Enable Cloud. Add managed Google as a sign-in provider. Configure Site URL + redirect URLs for the Lovable preview & published domain.

## 2. Database schema (single migration)

```text
profiles              1:1 auth.users        id (pk=auth.users.id), full_name, avatar_url, phone, created_at
app_role (enum)       'admin' | 'organizer' | 'vendor'
user_roles            (user_id, role) unique; drives dashboard routing + RLS
vendor_profiles       user_id (pk), business_name, category, description,
                      service_areas text[], price_min, price_max, embedding vector(1536) nullable
organizer_preferences user_id (pk), default_event_type, timezone,
                      notify_email bool, notify_sms bool
ai_conversations      id, user_id, title, created_at
ai_messages           id, conversation_id, role, content, created_at
ai_tasks              id, user_id, kind, status, input jsonb, result jsonb, error jsonb, created_at
                      (mirrors the standalone backend's task registry so the UI can poll from Supabase too)
```

- pgvector extension enabled for `vendor_profiles.embedding`.
- `has_role(uuid, app_role)` security-definer function (per the user_roles rules).
- Trigger `handle_new_user()` auto-creates `profiles` row on signup; role is set from `raw_user_meta_data.role` (defaults to `organizer`).
- RLS on every table + explicit `GRANT` blocks.

## 3. Auth UI

- Rebuild `SignIn.tsx` and `SignUp.tsx` on `@supabase/supabase-js`:
  - email/password
  - "Continue with Google" (managed provider)
  - role picker on signup (Organizer / Vendor) stored in `raw_user_meta_data`
  - `emailRedirectTo: window.location.origin`
- `AuthContext` uses `onAuthStateChange` + `getUser()` for trust-critical checks; exposes `{ user, role, loading }`.
- `ProtectedRoute` checks role; unauthenticated → `/signin`, wrong role → their own dashboard.
- Add `/reset-password` public route (required by our auth guidance).
- Sign out button in dashboard headers.

## 4. Frontend ↔ standalone backend bridge

- Add `VITE_BACKEND_URL` (defaults to `http://localhost:8080`).
- New `src/lib/backend.ts` client: attaches the Supabase access token as `Authorization: Bearer …` so the Node service can identify the user.
- Backend gets a small `authMiddleware` that verifies the Supabase JWT (`SUPABASE_JWKS_URL` env) and attaches `req.userId`.
- CORS on the backend allows the Lovable preview + published origins.

## 5. AI wiring (all three features)

**a) AI Assistant chat (streaming)** — `src/pages/dashboard/AIAssistantPage.tsx`
- Threaded: sidebar of conversations from `ai_conversations`, dedicated route `/dashboard/ai/:conversationId`.
- Streams via `GET {BACKEND}/v1/ai/stream?conversationId=…` (SSE). On each turn, frontend inserts the user message into `ai_messages`, opens the SSE, appends tokens live, and inserts the assistant message on `done`.
- Full history sent on every turn (model is stateless).
- Markdown rendering with `react-markdown`.

**b) Event brief generator** — inside the Event Workspace Overview tab
- "Generate AI brief" button → `POST {BACKEND}/v1/events/:id/brief` → `202 { taskId }`.
- UI polls `GET /v1/tasks/:id` every 1.5s; on `completed`, writes result into the event workspace and mirrors task to `ai_tasks`.

**c) Vendor semantic matching** — Vendors tab + Vendor onboarding
- On vendor profile save: `POST /v1/vendors/embed` with concatenated business text; backend embeds via OpenRouter and upserts into `pgvector`.
- "Find matching vendors" button on an event → `POST /v1/vendors/match` with the event brief → poll → render ranked vendor cards.

## 6. Secrets

- `LOVABLE_API_KEY` — already provisioned; not used here (we're on OpenRouter per your earlier choice).
- `OPENROUTER_API_KEY` — already saved. Used only by the standalone backend.
- Backend also needs `SUPABASE_URL`, `SUPABASE_JWKS_URL`, `SUPABASE_SERVICE_ROLE_KEY` in its own `.env` for JWT verification and privileged reads. I'll document these in `backend/.env.example`; you paste them from Cloud settings when deploying.

## 7. Verification before I hand off

- Sign up as organizer + as vendor → correct role assigned, correct dashboard opens.
- Google sign-in round-trip lands back on the dashboard.
- Refresh preserves session; sign-out clears it.
- AI Assistant streams tokens against the local backend (falls back to Mock adapter when key missing).
- Event brief job completes end-to-end; task row visible in `ai_tasks`.
- Vendor match returns ranked results with cosine-similarity scores.

## Out of scope for this pass

Payments, real-time messaging, ticket sales, email delivery. Say the word if you want any of those next.
