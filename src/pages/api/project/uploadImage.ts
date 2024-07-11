import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log(request);
  const formData = await request.formData();
  console.log(formData);
  const projectId = formData.get("projectId");
  const file = formData.get("file") as File;
  if (!projectId || !file) {
    return new Response("Missing projectId or file", { status: 400 });
  }

  const { data: imageRow, error: errorInsert } = await supabase
    .from("images")
    .insert({ project: projectId })
    .select("id");
  if (errorInsert) {
    console.log(errorInsert);
    return new Response(errorInsert.message, { status: 500 });
  }
  const idImage = imageRow[0].id;
  console.log(idImage);
  console.log(file);

  const { error: errorUpload } = await supabase.storage
    .from("images")
    .upload(idImage, file);
  if (errorUpload) {
    console.log(errorUpload);
    return new Response(errorUpload.message, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage
    .from("images")
    .getPublicUrl(idImage);
  console.log(publicUrl);
  if (!publicUrl) {
    return new Response("Error getting public URL", { status: 500 });
  }

  const url = publicUrl.publicUrl;

  const { data: dataUpdate, error: errorUpdate } = await supabase
    .from("images")
    .update({ url: url })
    .eq("id", idImage);
  if (errorUpdate) {
    console.log(errorUpdate);
    return new Response(errorUpdate.message, { status: 500 });
  }

  return new Response(dataUpdate, { status: 200 });
};
