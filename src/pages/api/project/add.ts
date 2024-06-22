import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log(request);
  const formData = await request.formData();
  console.log(formData);
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const tags = formData.get("tags")?.toString();
  const images = [
    "https://jcxgnvapdivmgjlgzgmc.supabase.co/storage/v1/object/sign/images/pipo.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGlwby5qcGciLCJpYXQiOjE3MTg2MDkxOTIsImV4cCI6MzMyNTQ2MDkxOTJ9.HFJcswWMfqBXpz9NPDELlvQszdo3SeSIjVnGSqsrbQ0&t=2024-06-17T07%3A26%3A32.832Z",
  ];
  // const images = formData.getAll("images");

  // if (!title || !description || !tags || !images) {
  //   return new Response("All fields are required", { status: 400 });
  // }

  // const imagesUrls: string[] = [];

  // // añadir imagenes al storage primero
  // images.forEach(async (image) => {
  //   const { data, error } = await supabase.storage.from("images").upload(
  //   if (error) {
  //     return new Response(error.message, { status: 500 });
  //   } else {
  //     imagesUrls.push(data.fullPath);
  //   }
  // });

  // // añadir proyecto a la base de datos

  const response = await supabase
    .from("projects")
    .insert([
      {
        title,
        description,
        tags,
        images,
        //
        // images: imagesUrls,
      },
    ])
    .select();
  console.log(response);
  // if (response.error)
  //   return new Response(response.error.message, { status: 500 });
  // return new Response(JSON.stringify(response.data), { status: 200 });
  return redirect("/dashboard");
};
