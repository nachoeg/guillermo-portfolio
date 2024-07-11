import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const tags = formData.get("tags")?.toString();
  if (tags === undefined || tags === "[]")
    return new Response("All fields are required", { status: 400 });
  const parsedTags = JSON.parse(tags);
  const response = await supabase
    .from("projects")
    .insert([
      {
        title,
        tags: parsedTags,
      },
    ])
    .select();
  if (response.error)
    return new Response(response.error.message, { status: 500 });
  return new Response(JSON.stringify(response.data), { status: 200 });
};
