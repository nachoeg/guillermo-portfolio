import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectsStore, tagsStore } from "@/store";
import getTags from "@/data/tags";
import getProjects from "@/data/projects";
import {
  validateImageSize,
  validateImageType,
  uploadImages,
} from "@/lib/uploadImages";

function ProjectAddButton({ id }: { id: number }) {
  const [loading, setLoading] = React.useState(false);

  const formSchema = z.object({
    images: z
      .any()
      .refine(validateImageSize, "El tamaño máximo es de 5MB")
      .refine(
        validateImageType,
        "Sólo se soportan los archivos de tipo .jpg, .jpeg, .png y .webp"
      ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await uploadImages(values.images, id);
    projectsStore.set(await getProjects());
    tagsStore.set(await getTags());
    setLoading(false);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"carousel"} size={"icon"}>
          <Plus className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Imagenes</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      multiple
                      type="file"
                      accept="image/*"
                      placeholder="Imagenes"
                      onChange={(event) => {
                        return onChange(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-full" type="submit">
              {loading ? <LoadingButton /> : "Guardar cambios"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectAddButton;
