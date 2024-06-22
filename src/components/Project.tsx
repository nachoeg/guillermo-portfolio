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
import { Squares } from "@/icons/Squares";
import { useRef } from "react";

interface ProjectData {
  title: string;
  description: string;
  images: string[];
}

export function Project({ data, index }: { data: ProjectData; index: number }) {
  const ref = useRef<{ handleKeyPress: (event: any) => void }>(null);

  const handleKeyPress = (event: any) => {
    ref.current?.handleKeyPress(event);
  };
  const animationStyle = {
    animationDelay: `${index * 150}ms`,
    animationFillMode: "both",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex aspect-square p-0 justify-center select-none overflow-clip rounded-md group relative bg-neutral-200 dark:bg-neutral-800  size-full animate-fade-in 
          `}
          style={animationStyle}
        >
          {data.images.length > 1 && (
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
              <Squares className="fill-white drop-shadow"></Squares>
            </div>
          )}
          {/* <img
            src={data.images[0]}
            className=" absolute aspect-auto object-cover w-full h-full blur-3xl saturate-200    brightness-125 "
            alt={"Project: " + data.title}
          /> */}
          <img
            src={data.images[0]}
            className=" cursor-pointer transition duration-200 group-hover:brightness-75 object-cover object-center w-full z-10 "
            alt={"Project: " + data.title}
          />
        </div>
      </DialogTrigger>
      <DialogContent
        onKeyDown={handleKeyPress}
        className={`overflow-hidden sm:rounded-none md:rounded-xl md:max-h-[calc(100vh-10px)] 
        w-max max-w-full min-h-full md:min-h-min  md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl
         gap-0 border-0 sm:border border-neutral-800 `}
      >
        {/* <DialogHeader className="p-4 ">
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader> */}
        <CarouselProject ref={ref} images={data.images} />
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
