import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
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
import { toast } from "sonner";
import { projectsStore, tagsStore } from "@/store";
import { useStore } from "@nanostores/react";
import getProjects from "@/data/projects";
import getTags from "@/data/tags";
import LoadingButton from "./LoadingButton";

function ProjectEditButton({
  id,
  title,
  tags,
}: {
  id: number;
  title: string;
  tags: string[];
}) {
  const [loading, setLoading] = useState(false);

  const defaultTags = tags.map((tag) => ({
    label: tag,
    value: tag,
  }));

  const tagsOptions: Option[] = useStore(tagsStore).map((tag) => ({
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
      tags: defaultTags,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const body = new FormData();
    body.append("title", values.title);
    body.append("tags", JSON.stringify(values.tags.map((tag) => tag.value)));
    body.append("id", id.toString());
    const response = await fetch("/api/project/editProject", {
      method: "PUT",
      body: body,
    });
    if (response.ok) {
      projectsStore.set(await getProjects());
      tagsStore.set(await getTags());
      toast.success("Proyecto actualizado");
    } else {
      toast.error("Error al actualizar el proyecto");
    }
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
              {loading ? <LoadingButton /> : "Guardar cambios"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectEditButton;
