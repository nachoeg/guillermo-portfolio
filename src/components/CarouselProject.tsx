import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ClassNamesPlugin from "embla-carousel-class-names";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  type Key,
} from "react";
import { DotButton, useDotButton } from "./ui/EmblaCarouselDotButton";

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

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

    return (
      <Carousel
        setApi={setApi}
        opts={{
          duration: 20,
          // ,containScroll: false
        }}
        className="bg-black"
        plugins={[
          WheelGesturesPlugin(),
          ClassNamesPlugin({ snapped: "isSnapped" }),
        ]}
      >
        <CarouselContent className="w-full ">
          {images.map((image, index) => (
            <CarouselItem
              className="rounded-none border-0 p-0 justify-center cursor-grab  active:cursor-grabbing  select-none  relative flex  w-full sm:w-auto basis-auto duration-200 md:blur-xl opacity-20 bg-neutral-800"
              key={index}
            >
              {/* <img
                src={image}
                className=" absolute aspect-auto object-cover w-full h-full blur-3xl saturate-200 brightness-125 border-0"
                alt={`Project ${index + 1}`}
              /> */}
              <img
                src={image}
                className="max-w-screen max-h-screen  sm:max-h-[calc(100vh-20px)] object-contain z-10 border-0"
                alt={`Project ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="absolute bottom-3 py-2 px-1.5 items-center flex gap-1  w-fit mx-auto inset-x-0 bg-white/80 dark:bg-black/80 rounded-full">
          {scrollSnaps.map((_: any, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={" size-1.5 rounded-full ".concat(
                index === selectedIndex
                  ? "bg-neutral-800 dark:bg-neutral-50"
                  : "bg-neutral-950/30 dark:bg-neutral-50/30"
              )}
            />
          ))}
        </div>
      </Carousel>
    );
  }
});
