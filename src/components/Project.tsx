import { CarouselProject } from "@/components/CarouselProject";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectData {
  title: string;
  description: string;
  images: string[];
}

export function Project({ data }: { data: ProjectData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className="cursor-pointer hover:brightness-75"
          src={data.images[0]}
          alt={"Project: " + data.title}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl gap-0">
        <DialogHeader className="p-3">
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>
        <CarouselProject images={data.images} />
        {/* <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div> */}
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
