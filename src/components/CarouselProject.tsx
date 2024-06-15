import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export const CarouselProject = forwardRef<
  { handleKeyPress: (event: any) => void },
  { images: string[] }
>(({ images }, ref) => {
  {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!api) {
        return;
      }

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    const renderDots = () => {
      if (count <= 1) {
        return null;
      }
      const dots = [];
      for (let i = 0; i < count; i++) {
        dots.push(
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`size-1.5 rounded-full mx-0.5 ${
              current === i + 1
                ? "bg-neutral-800 dark:bg-neutral-50"
                : "bg-neutral-950/30 dark:bg-neutral-50/30"
            }`}
          />
        );
      }
      return (
        <div className="absolute bottom-3 py-2 px-1 items-center flex w-fit mx-auto inset-x-0 bg-white/80 dark:bg-black/80 rounded-full">
          {dots}
        </div>
      );
    };
    const handleKeyPress = (event: any) => {
      if (event.key === "ArrowLeft") {
        api?.scrollPrev();
      }
      if (event.key === "ArrowRight") {
        api?.scrollNext();
      }
    };

    useImperativeHandle(ref, () => ({
      handleKeyPress,
    }));

    return (
      <Carousel setApi={setApi} className="w-full max-w-xl relative">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="rounded-none border-0">
                <CardContent
                  className={`flex aspect-square p-0 justify-center cursor-grab  active:cursor-grabbing  select-none overflow-clip  relative rounded-none bg-neutral-200 dark:bg-neutral-800 `}
                >
                  {/* <img
                    src={image}
                    className=" absolute aspect-auto object-cover w-full h-full blur-3xl saturate-200 brightness-125 border-0"
                    alt={`Project ${index + 1}`}
                  /> */}
                  <img
                    src={image}
                    className="transition duration-200 object-contain z-10 border-0"
                    alt={`Project ${index + 1}`}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        {renderDots()}
      </Carousel>
    );
  }
});
