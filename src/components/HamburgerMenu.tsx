import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideMenu } from "lucide-react";

export function HamburgerMenu(props: { children: React.ReactNode }) {
  return (
    <div className={"sm:hidden"}>
      <Sheet>
        <SheetTrigger className="h-full">
          <LucideMenu></LucideMenu>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Contacto</SheetTitle>
          </SheetHeader>
          <ul className="[&_li]:mt-4">{props.children}</ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default HamburgerMenu;
