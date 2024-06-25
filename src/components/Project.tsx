import { CarouselProject } from "@/components/CarouselProject";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Squares } from "@/icons/Squares";
import { useRef } from "react";
import ProjectThumbnail from "./ProjectThumbnail";

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
          <ProjectThumbnail src={data.images[0]} alt={data.title} />
        </div>
      </DialogTrigger>
      <DialogContent
        onKeyDown={handleKeyPress}
        className={`overflow-hidden sm:rounded-none md:rounded-xl md:max-h-[calc(100vh-10px)] 
        w-full max-w-full  min-h-full md:min-h-96   md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl gap-0 border-0 sm:border border-neutral-800`}
      >
        <CarouselProject ref={ref} images={data.images} title={data.title} />
      </DialogContent>
    </Dialog>
  );
}
