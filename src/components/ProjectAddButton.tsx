import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

function ProjectAddButton() {
  return (
    <Button variant={"carousel"} size={"icon"}>
      <Plus className="size-6" />
    </Button>
  );
}

export default ProjectAddButton;
