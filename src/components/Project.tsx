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
        <div
          className={
            "flex aspect-square p-0 justify-center hover:brightness-75 select-none overflow-clip rounded  relative"
          }
        >
          <img
            src={data.images[0]}
            className=" absolute aspect-auto object-cover w-full h-full blur-3xl brightness-150 "
            alt={"Project: " + data.title}
          />
          <img
            src={data.images[0]}
            className=" cursor-pointer transition duration-200 object-contain z-10"
            alt={"Project: " + data.title}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl gap-0 overflow-clip">
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
