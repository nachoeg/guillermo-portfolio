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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import LoadingButton from "./LoadingButton";

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
    compression: z.boolean().default(false).optional(),
    compressionQuality: z.number().min(0.4).max(0.8).default(0.6),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      compression: true,
      compressionQuality: 0.6,
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
    await uploadImages(
      values.images,
      id,
      values.compression,
      values.compressionQuality
    );
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

        <DialogContent className="gap-0">
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="compression"
                  render={({ field }) => (
                    <FormItem className="flex space-x-2 items-end rounded-md  ">
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="compression"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="compression"
                            className="text-sm cursor-pointer select-none"
                          >
                            Comprimir imagen{" "}
                            <span className="text-neutral-500 dark:text-neutral-500">
                              (recomendado)
                            </span>
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="border p-3 rounded-md space-y-3">
                  <FormField
                    control={form.control}
                    name="compressionQuality"
                    render={({ field: { value, onChange } }) => (
                      <FormItem
                        className={`flex-grow flex flex-col transition-all duration-500  ${
                          !form.watch("compression") &&
                          "opacity-50 pointer-events-none"
                        }`}
                      >
                        <FormLabel className="">Calidad de imagen</FormLabel>
                        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-500">
                          <div>Baja</div>
                          <div>|</div>
                          <div>Alta</div>
                        </div>
                        <FormControl>
                          <Slider
                            min={0.4}
                            max={0.8}
                            step={0.1}
                            defaultValue={[value]}
                            onValueChange={(vals) => {
                              onChange(vals[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button disabled={loading} type="submit">
                {loading ? <LoadingButton /> : "Agregar"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
