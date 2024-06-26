import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  if (id === undefined)
    return new Response("All fields are required", { status: 400 });
  const { error } = await supabase.from("images").delete().eq("project", id);
  console.log(error);
  if (error) new Response(error.message, { status: 500 });
  const response = await supabase.from("projects").delete().eq("id", id);
  console.log(response);
  if (response.error)
    new Response(response.error.message, { status: response.status });
  return redirect("/dashboard");
};
