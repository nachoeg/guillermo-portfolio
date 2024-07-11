import React from "react";
import { Button } from "./ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ProjectEditButton from "./ProjectEditButton";

function ProjectDashboard({
  id,
  title,
  current,
  count,
  tags,
}: {
  id: number;
  title: string;
  current: number;
  count: number;
  tags: string[];
}) {
  const handleDelete = () => {
    //borra la imagen actual y si es la unica borra el proyecto
    console.log("Delete", current);
  };

  const handleAdd = () => {
    //agrega una imagen al final
    console.log("Add", current);
  };
  return (
    <div className="absolute bottom-3 right-3 flex gap-2 [&_button]:shadow ">
      <ProjectEditButton id={id} title={title} tags={tags}></ProjectEditButton>

      <Button variant={"carousel"} size={"icon"} onClick={handleDelete}>
        <Trash className="size-5" />
      </Button>
      <Button variant={"carousel"} size={"icon"} onClick={handleAdd}>
        <Plus className="size-6" />
      </Button>
    </div>
  );
}

export default ProjectDashboard;
