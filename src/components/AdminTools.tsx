import { LogOut, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { AddProject } from "./AddProject";
import { Input } from "./ui/input";

function AdminTools() {
  return (
    <div className="flex flex-wrap gap-y-2 gap-x-2 [&_button]:shadow ">
      <AddProject />
      <form method="post" action="/api/project/delete" className="flex">
        <Input
          className="rounded-e-none"
          size={1}
          placeholder="ID"
          name="id"
          id="id"
        />
        <Button variant="secondary" className="gap-1 rounded-s-none">
          <Trash className="size-4" /> Eliminar
        </Button>
      </form>
      <form action="/api/auth/signout">
        <Button type="submit" variant="secondary" className="gap-1">
          <LogOut className="size-4" />
        </Button>
      </form>
    </div>
  );
}

export default AdminTools;
