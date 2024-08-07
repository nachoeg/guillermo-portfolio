import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Squares } from "@/icons/Squares";
import { useRef } from "react";
import ProjectThumbnail from "./ProjectThumbnail";
import DeleteProject from "./DeleteProject";

export function Project({
  data,
  index,
  isAuth,
}: {
  data: Project;
  index: number;
  isAuth: boolean;
}) {
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
      <div className="relative h-fit animate-fade-in">
        <DialogTrigger asChild>
          <div
            className={`flex aspect-square p-0 justify-center select-none overflow-clip rounded-md group relative bg-neutral-200 dark:bg-neutral-900 size-full`}
            style={animationStyle}
          >
            {/* <div className="absolute top-3 bg-background px-1 rounded-md drop-shadow left-3 z-20 pointer-events-none">
              {data.id}
            </div> */}
            {data.images.length > 1 && (
              <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <Squares className="fill-white drop-shadow size-7"></Squares>
              </div>
            )}
            <ProjectThumbnail src={data.images[0].url} alt={data.title} />
          </div>
        </DialogTrigger>
        {isAuth && <DeleteProject id={data.id} />}
      </div>
      <DialogContent
        onKeyDown={handleKeyPress}
        className={` sm:rounded-none md:rounded-xl md:max-h-[calc(100vh-10px)] 
        w-full max-w-full  min-h-full md:min-h-fit   md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl gap-0 border-0 sm:border border-neutral-800 bg-black`}
      >
        <ProjectCarousel
          ref={ref}
          id={data.id}
          images={data.images}
          title={data.title}
          tags={data.tags}
          isAuth={isAuth}
        ></ProjectCarousel>
      </DialogContent>
    </Dialog>
  );
}
