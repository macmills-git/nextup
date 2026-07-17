// Embed a vendor profile and upsert into vendor_profiles.embedding.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

  const body = await req.json().catch(() => ({}));
  const text = typeof body.text === "string" ? body.text.slice(0, 8000) : "";
  if (!text) return new Response(JSON.stringify({ error: "text required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const emb = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai/text-embedding-3-small", input: text, dimensions: 1536 }),
  });
  if (!emb.ok) {
    return new Response(JSON.stringify({ error: await emb.text() }), { status: emb.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const embJson = await emb.json();
  const vector = embJson.data?.[0]?.embedding;
  if (!Array.isArray(vector)) {
    return new Response(JSON.stringify({ error: "no embedding" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const { error } = await supabase
    .from("vendor_profiles")
    .update({ embedding: vector as unknown as string })
    .eq("user_id", userId);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
