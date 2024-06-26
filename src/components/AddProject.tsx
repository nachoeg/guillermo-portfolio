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
import TAGS from "@/data/tags.js";
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

const tags: Option[] = TAGS.map((tag) => ({
  label: tag,
  value: tag,
}));

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const validateImageSize = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
  }
  return true;
};

const validateImageType = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return false;
    }
  }
  return true;
};

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

export function AddProject() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // FALTA BORRAR IMAGENES SI HAY ERROR AL SUBIR EL PROYECTO CUANDO SE SUBEN LAS IMAGENES
  async function uploadImages(files: FileList) {
    const images: string[] = [];
    for (const image of files) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await fetch("/api/project/uploadProject", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const url = await response.text();
          images.push(url);
          toast.success("Imagen subida");
        } else {
          toast.error("Error al subir imagen");
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(images);
    return images;
  }

  async function uploadImagesWithCompression(files: FileList) {
    const images: string[] = [];
    for (const image of files) {
      console.log(image.size);
      await new Promise<void>((resolve, reject) => {
        new Compressor(image, {
          quality: 0.6,
          success(result) {
            console.log(result.size);
            const formData = new FormData();
            formData.append("file", result);
            fetch("/api/project/uploadProject", {
              method: "POST",
              body: formData,
            })
              .then((response) => {
                if (response.ok) {
                  response.text().then((url) => {
                    images.push(url);
                    toast.success("Imagen subida");
                    resolve();
                  });
                } else {
                  toast.error("Error al subir imagen");
                  reject();
                }
              })
              .catch((error) => {
                console.log(error);
                reject();
              });
          },
          error(err) {
            console.log(err.message);
            reject();
          },
        });
      });
    }
    return images;
  }

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    // const images = await uploadImages(values.images);
    const body = new FormData();
    body.append("title", values.title);
    body.append("tags", JSON.stringify(values.tags.map((tag) => tag.value)));
    // body.append("images", JSON.stringify(images));
    console.log(body);
    const response = await fetch("/api/project/addProject", {
      method: "POST",
      body: body,
    });
    console.log(response);
    if (response.ok) {
      toast.success("Proyecto agregado");
    } else {
      toast.error("Error al agregar proyecto");
    }
    setLoading(false);
  }

  return (
    <>
      <Dialog>
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
