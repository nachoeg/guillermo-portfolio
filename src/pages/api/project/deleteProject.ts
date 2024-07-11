import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  if (id === undefined)
    return new Response("All fields are required", { status: 400 });
  const { data: images, error: imagesError } = await supabase
    .from("images")
    .select("id")
    .eq("project", id);
  if (imagesError) {
    console.log(imagesError);
    return new Response(imagesError.message, { status: 500 });
  }
  if (images !== null) {
    for (const image of images) {
      const { data, error } = await supabase.storage
        .from("images")
        .remove([image.id]);

      if (error) {
        console.log(error);
        return new Response(error.message, {
          status: 500,
        });
      }
    }
  }
  const { error } = await supabase.from("images").delete().eq("project", id);
  if (error) {
    console.log(error);
    new Response(error.message, { status: 500 });
  }
  const response = await supabase.from("projects").delete().eq("id", id);
  if (response.error)
    new Response(response.error.message, { status: response.status });
  return redirect("/dashboard");
};
