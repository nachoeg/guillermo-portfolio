import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function SignInForm() {
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      toast.error("Las credenciales son incorrectas");
    }
  };

  return (
    <Card className="mx-auto my-auto w-[350px]">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
      </CardHeader>
      <form onSubmit={handleOnSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input type="password" name="password" id="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default SignInForm;
