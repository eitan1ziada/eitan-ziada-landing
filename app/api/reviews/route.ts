import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, role, text, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  const { name, role, text, rating } = await req.json();
  if (!name || !text) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const { error } = await supabase.from("reviews").insert({ name, role, text, rating: rating ?? 5, approved: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
