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
import getTags from "@/data/tags.js";
import getProjects from "@/data/projects";
import {
  validateImageSize,
  validateImageType,
  uploadImages,
} from "@/lib/uploadImages";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";

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
    compression: z.boolean().default(false).optional(),
    compressionQuality: z.number().min(0.4).max(0.8).default(0.6),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      compression: true,
      compressionQuality: 0.6,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await uploadImages(
      values.images,
      id,
      values.compression,
      values.compressionQuality
    );
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
