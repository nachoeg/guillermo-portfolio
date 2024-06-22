import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(500),
  tags: z.string().max(50),
  // images: z.any(),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max image size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ),
  // tags: z.array(z.string()).max(5),
  images: z.array(z.string()).max(10),
});

export function AddProject() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      images: [
        "https://jcxgnvapdivmgjlgzgmc.supabase.co/storage/v1/object/sign/images/pipo.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGlwby5qcGciLCJpYXQiOjE3MTg2MDkxOTIsImV4cCI6MzMyNTQ2MDkxOTJ9.HFJcswWMfqBXpz9NPDELlvQszdo3SeSIjVnGSqsrbQ0&t=2024-06-17T07%3A26%3A32.832Z",
      ],
      // tags: [],
      // images: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    //subir imagenes al storage
    //y luego con los links que devuelvan hacer un array
    //y luego subir el proyecto con los links de las imagenes
    const body = new FormData();
    body.append("title", values.title);
    body.append("description", values.description);
    body.append("tags", values.tags);
    // body.append("images", values.images[0]);
    // values.images.forEach((image) => {
    //   body.append("images", image);
    // });
    fetch("/api/project/add", {
      method: "POST",
      body: body,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="size-4" /> Agregar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="p-4 ">
          <DialogTitle>Agregar proyecto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripcion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiquetas</FormLabel>
                  <FormControl>
                    <Input placeholder="Etiquetas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagenes</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      placeholder="Imagenes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit">Agregar</Button>
          </form>
        </Form>
        {/* <form method="post" action="/api/project/add">
          label
          <Button size="sm" className="gap-1" type="submit">
            <Plus className="size-4" /> Agregar
          </Button>
        </form> */}
      </DialogContent>
    </Dialog>
  );
}
