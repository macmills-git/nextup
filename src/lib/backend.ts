import { supabase } from "@/integrations/supabase/client";

export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string | undefined) ?? "http://localhost:8080";

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface BackendError extends Error {
  status?: number;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  Object.entries(await authHeader()).forEach(([k, v]) => headers.set(k, v));
  const res = await fetch(`${BACKEND_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(text || `${res.status} ${res.statusText}`) as BackendError;
    err.status = res.status;
    throw err;
  }
  return res.json() as Promise<T>;
}

export const backend = {
  enqueueEventBrief: (eventId: string, brief: unknown) =>
    request<{ taskId: string; poll: string }>(`/v1/events/${eventId}/brief`, {
      method: "POST",
      body: JSON.stringify({ eventId, brief }),
    }),
  enqueueVendorMatch: (payload: { query: string; limit?: number }) =>
    request<{ taskId: string; poll: string }>(`/v1/vendors/match`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  upsertVendorEmbedding: (vendorId: string, text: string) =>
    request<{ ok: true }>(`/v1/vendors/embed`, {
      method: "POST",
      body: JSON.stringify({ vendorId, text }),
    }),
  pollTask: (taskId: string) => request<{ status: string; result?: unknown; error?: unknown }>(`/v1/tasks/${taskId}`),

  /** Open an SSE stream from the AI backend. Returns an EventSource-like handle. */
  openStream: async (prompt: string, conversationId?: string, onToken?: (t: string) => void, onDone?: () => void, onError?: (e: string) => void) => {
    const headers = await authHeader();
    const qs = new URLSearchParams({ prompt });
    if (conversationId) qs.set("correlationId", conversationId);
    // EventSource can't send auth headers; use fetch + reader for SSE.
    const res = await fetch(`${BACKEND_URL}/v1/ai/stream?${qs.toString()}`, { headers });
    if (!res.ok || !res.body) throw new Error(`stream ${res.status}`);
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let cancelled = false;
    (async () => {
      while (!cancelled) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() ?? "";
        for (const chunk of parts) {
          const lines = chunk.split("\n");
          let event = "message";
          let data = "";
          for (const l of lines) {
            if (l.startsWith("event:")) event = l.slice(6).trim();
            if (l.startsWith("data:")) data += l.slice(5).trim();
          }
          if (!data) continue;
          try {
            const parsed = JSON.parse(data);
            if (event === "token" && parsed.chunk) onToken?.(parsed.chunk);
            else if (event === "done") onDone?.();
            else if (event === "error") onError?.(parsed.message ?? "stream error");
          } catch {
            /* ignore */
          }
        }
      }
      onDone?.();
    })();
    return { close: () => { cancelled = true; reader.cancel().catch(() => {}); } };
  },
};
