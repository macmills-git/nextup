// Synchronous AI event-brief generator using Lovable AI Gateway.
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BodySchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  guestCount: z.number().int().positive().optional(),
  budget: z.number().nonnegative().optional(),
  eventType: z.string().max(100).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: claims } = await supabase.auth.getClaims(authHeader.slice(7));
  const userId = claims?.claims?.sub;
  if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

  const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const input = parsed.data;

  const { data: task } = await supabase.from("ai_tasks").insert({
    user_id: userId,
    kind: "event_brief",
    status: "processing",
    input: input as unknown as Record<string, unknown>,
  }).select("id").single();

  const prompt = `Generate a structured event brief for an organizer.
Return JSON with keys: summary, timeline (array of {phase, tasks}), vendorNeeds (array of strings), budgetBreakdown (object), risks (array), successMetrics (array).

Event: ${input.title}
Description: ${input.description}
${input.eventType ? `Type: ${input.eventType}` : ""}
${input.guestCount ? `Guests: ${input.guestCount}` : ""}
${input.budget ? `Budget: $${input.budget}` : ""}`;

  const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are Nested AI, an expert event planner. Output ONLY valid JSON." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    if (task) await supabase.from("ai_tasks").update({ status: "failed", error: { message: errText } }).eq("id", task.id);
    return new Response(JSON.stringify({ error: errText }), { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const data = await upstream.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  let result: unknown;
  try { result = JSON.parse(content); } catch { result = { raw: content }; }

  if (task) await supabase.from("ai_tasks").update({ status: "completed", result: result as Record<string, unknown> }).eq("id", task.id);

  return new Response(JSON.stringify({ taskId: task?.id, result }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
