import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();

  const response = await supabase.from("projects").delete().eq("id", id);
  console.log(response);
  if (response.error)
    new Response(response.error.message, { status: response.status });
  return redirect("/dashboard");
};
