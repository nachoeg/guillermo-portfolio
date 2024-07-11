import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const DELETE: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  if (id === undefined)
    return new Response("El id de la imagen es indefinido", { status: 400 });
  const { error: errorDeleteStorage } = await supabase.storage
    .from("images")
    .remove([id]);
  if (errorDeleteStorage) {
    console.error(errorDeleteStorage);
    return new Response(errorDeleteStorage.message, { status: 500 });
  }
  const { error: errorDeleteImage } = await supabase
    .from("images")
    .delete()
    .eq("id", id);
  if (errorDeleteImage) {
    console.error(errorDeleteImage);
    return new Response(errorDeleteImage.message, { status: 500 });
  }

  return new Response("Imagen eliminada", { status: 200 });
};
