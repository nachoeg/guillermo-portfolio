import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function SignOut() {
  return (
    <form action="/api/auth/signout">
      <Button type="submit" variant="secondary" className="gap-1">
        <LogOut className="size-4" />
      </Button>
    </form>
  );
}

export default SignOut;
