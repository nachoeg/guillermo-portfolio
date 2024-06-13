import * as React from "react";
import { Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("theme-light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  function handleClick() {
    setThemeState((theme) =>
      theme === "theme-light"
        ? "dark"
        : theme === "dark"
        ? "theme-light"
        : theme
    );
  }

  return (
    <div className="flex items-center justify-between ">
      <span className="sm:hidden ">Cambiar tema</span>

      <Button
        className="ring-0 hidden sm:flex"
        variant="ghost"
        size="icon"
        onClick={handleClick}
      >
        <Sun
          className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          strokeWidth={1.5}
        />
        <Moon
          className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          strokeWidth={1.5}
        />
        <span className="sr-only">Cambiar tema</span>
      </Button>
      <Button
        className="ring-0 sm:hidden"
        variant="outline"
        size="icon"
        onClick={handleClick}
      >
        <Sun
          className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          strokeWidth={1.5}
        />
        <Moon
          className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          strokeWidth={1.5}
        />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    </div>
    // <DropdownMenu>
    // <DropdownMenuTrigger asChild>
    //   <Button className="ring-0" variant="ghost" size="icon">
    //     <Sun
    //       className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    //       strokeWidth={1.5}
    //     />
    //     <Moon
    //       className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    //       strokeWidth={1.5}
    //     />
    //     <span className="sr-only">Toggle theme</span>
    //   </Button>
    // </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setThemeState("theme-light")}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setThemeState("dark")}>
    //       Dark
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setThemeState("system")}>
    //       System
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
