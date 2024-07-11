import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import getProjects from "@/data/projects";
import { projectsStore, tagsStore } from "@/store";
import { Spinner } from "./ui/spinner";
import { useState } from "react";
import getTags from "@/data/tags.js";

function DeleteProject({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id.toString());
      const response = await fetch(`/api/project/deleteProject/`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        projectsStore.set(await getProjects());
        tagsStore.set(await getTags());
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="absolute  bottom-3 right-3 z-20 " asChild>
        <Button size={"icon"} className="shadow" variant={"secondary"}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 p-4">
        <DialogHeader>
          <DialogTitle>Borrar proyecto</DialogTitle>
          <DialogDescription>
            Estas seguro que quieres borrar este proyecto?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancelar</Button>
          </DialogClose>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={handleDelete}
          >
            {loading ? (
              <div className="flex gap-1 items-center">
                <Spinner size={"small"} className="text-neutral-50" />
                Cargando...
              </div>
            ) : (
              "Borrar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProject;
