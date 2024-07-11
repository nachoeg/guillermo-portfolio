import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const PUT: APIRoute = async ({ request, redirect }) => {
  console.log("hola!");
  const formData = await request.formData();
  console.log(formData);
  const title = formData.get("title")?.toString();
  const tags = formData.get("tags")?.toString();
  const id = formData.get("id")?.toString();
  console.log(tags, id, title);
  if (tags === undefined || tags === "[]")
    return new Response("All fields are required", { status: 400 });
  const parsedTags = JSON.parse(tags);
  const response = await supabase
    .from("projects")
    .update({ title, tags: parsedTags })
    .eq("id", id)

    .select();
  console.log(response);
  if (response.error)
    return new Response(response.error.message, { status: 500 });
  return new Response(JSON.stringify(response.data), { status: 200 });
};
