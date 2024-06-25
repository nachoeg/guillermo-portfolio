import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

//upload file to supabase storage
export const POST: APIRoute = async ({ request, redirect }) => {
  console.log(request);
  const formData = await request.formData();
  console.log(formData);
  const file = formData.get("file") as File;
  console.log(file);
  const { error } = await supabase.storage
    .from("images")
    .upload(file.name, file);
  if (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
  const { data } = supabase.storage.from("images").getPublicUrl(file.name);
  console.log(data);
  return new Response(data.publicUrl, { status: 200 });
};
