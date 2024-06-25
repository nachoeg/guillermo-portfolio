import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log(request);
  const formData = await request.formData();
  console.log(formData);
  const title = formData.get("title")?.toString();
  const tags = JSON.parse(formData.get("tags")?.toString() || "[]");
  const images = JSON.parse(formData.get("images")?.toString() || "[]");
  if (tags === "[]" || formData.get("images") === "[]")
    return new Response("All fields are required", { status: 400 });
  const response = await supabase
    .from("projects")
    .insert([
      {
        title,
        tags,
        images,
      },
    ])
    .select();
  console.log(response);
  if (response.error)
    return new Response(response.error.message, { status: 500 });
  return new Response(JSON.stringify(response.data), { status: 200 });
};
