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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Compressor from "compressorjs";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import MultipleSelector, {
  type Option,
} from "@/components/ui/multiple-selector";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import getProjects from "@/data/projects";
import { projectsStore, tagsStore } from "@/store";
import getTags from "@/data/tags.js";
import { useStore } from "@nanostores/react";
import {
  uploadImages,
  validateImageSize,
  validateImageType,
} from "@/lib/uploadImages";

export function AddProject() {
  const tags: Option[] = useStore(tagsStore).map((tag) => ({
    label: tag,
    value: tag,
  }));

  const formSchema = z.object({
    title: z.string().max(50),
    tags: z.array(z.any()),
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
    defaultValues: {
      title: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const body = new FormData();
    body.append("title", values.title);
    body.append("tags", JSON.stringify(values.tags.map((tag) => tag.value)));
    const response = await fetch("/api/project/addProject", {
      method: "POST",
      body: body,
    });
    const id = await response.json().then((data) => data[0].id);
    if (!response.ok) {
      toast.error("Error al agregar proyecto");
      setLoading(false);
      return;
    }
    toast.success("Proyecto agregado");
    await uploadImages(values.images, id);
    projectsStore.set(await getProjects());
    tagsStore.set(await getTags());
    setLoading(false);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-1" variant={"secondary"}>
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
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiquetas</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={tags}
                        hideClearAllButton
                        creatable
                        hidePlaceholderWhenSelected
                        emptyIndicator={
                          <p className="text-center text-gray-600 dark:text-gray-400">
                            No se encontraron resultados
                          </p>
                        }
                        placeholder="Etiquetas"
                      ></MultipleSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button disabled={loading} type="submit">
                {loading ? (
                  <div className="flex gap-1 items-center">
                    <Spinner
                      size={"small"}
                      className="text-neutral-50 dark:text-neutral-950"
                    />
                    Cargando...
                  </div>
                ) : (
                  "Agregar"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
