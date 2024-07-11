import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { set, z } from "zod";
import MultipleSelector, { type Option } from "./ui/multiple-selector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function ProjectEditButton({ title, tags }: { title: string; tags: string[] }) {
  const [loading, setLoading] = useState(false);

  const tagsOptions: Option[] = tags.map((tag) => ({
    label: tag,
    value: tag,
  }));

  const formSchema = z.object({
    title: z.string().max(50),
    tags: z.array(z.any()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      tags: tagsOptions,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    //llamar a la api para guardar los cambios
    setLoading(false);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"carousel"} size={"icon"}>
          <Edit className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      defaultOptions={tagsOptions}
                      hideClearAllButton
                      creatable
                      hidePlaceholderWhenSelected
                      placeholder="Etiquetas"
                    ></MultipleSelector>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-full" type="submit">
              {loading ? (
                <div className="flex gap-1 items-center">
                  <Spinner
                    size={"small"}
                    className="text-neutral-50 dark:text-neutral-950"
                  />
                  Cargando...
                </div>
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectEditButton;
