import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import LoadingButton from "./LoadingButton";
import { projectsStore, tagsStore } from "@/store";
import getProjects from "@/data/projects";
import { toast } from "sonner";

function ProjectDeleteButton({ imageId }: { imageId: string }) {
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const body = new FormData();
    body.append("id", imageId);
    const response = await fetch("/api/project/deleteImage", {
      method: "DELETE",
      body,
    });
    if (response.ok) {
      projectsStore.set(await getProjects());
      toast.success("Imagen eliminada");
    } else {
      toast.error("Error al eliminar la imagen");
    }
    setLoading(false);
  }

  const [loading, setLoading] = useState(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"carousel"} size={"icon"}>
          <Trash className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <p className="text-sm">
            Estas seguro que quieres eliminar esta imagen?
          </p>
          <Button
            className="w-full"
            variant={"destructive"}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <LoadingButton textColor="text-white" />
            ) : (
              "Eliminar imagen"
            )}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default ProjectDeleteButton;
