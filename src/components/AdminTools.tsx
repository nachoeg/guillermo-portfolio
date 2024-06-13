import { Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";

export default function AdminTools() {
  const handleClickAdd = () => {
    console.log("Add clicked");
  };
  const handleClickDelete = () => {
    console.log("Delete clicked");
  };
  return (
    <div className="flex flex-wrap gap-y-4 gap-x-2">
      <Button onClick={handleClickAdd} size="sm" className="gap-1">
        <Plus className="size-4" /> Agregar
      </Button>
      <Button
        onClick={handleClickDelete}
        variant="secondary"
        size="sm"
        className="gap-1"
      >
        <Trash className="size-4" /> Eliminar
      </Button>
    </div>
  );
}
