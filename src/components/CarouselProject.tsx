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
      return (
        <div className="absolute bottom-3 py-1.5 px-1.5  flex gap-1  w-fit mx-auto inset-x-0 bg-white/80 dark:bg-black/80 rounded-full">
          {scrollSnaps.map((_: any, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"size-1.5 rounded-full ".concat(
                index === selectedIndex
                  ? "bg-neutral-800 dark:bg-neutral-50"
                  : "bg-neutral-950/30 dark:bg-neutral-50/30"
              )}
            />
          ))}
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

    const handleMouseMove = (event: any) => {
      event.target.style.setProperty(
        "--x",
        100 *
          ((event.clientX * 1.5 - (window.innerWidth - event.clientX)) /
            event.target.offsetWidth) +
          "%"
      );
      event.target.style.setProperty(
        "--y",
        100 *
          ((event.clientY * 1.5 - (window.innerHeight - event.clientY)) /
            event.target.offsetHeight) +
          "%"
      );
    };

    const handleZoomIn = (event: any) => {
      console.log(event.target);

      if (event.target.style.getPropertyValue("--zoom") === "1.5") {
        event.target.style.setProperty("--zoom", 1);
        event.target.style.setProperty("--cursor", "zoom-in");
      } else {
        event.target.style.setProperty("--zoom", 1.5);
        event.target.style.setProperty("--cursor", "zoom-out");
      }
    };

    return (
      <Carousel
        setApi={setApi}
        opts={{
          skipSnaps: true,
        }}
        className="bg-black"
        plugins={[
          WheelGesturesPlugin(),
          ClassNamesPlugin({ snapped: "isSnapped" }),
        ]}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem
              className={
                "rounded-none border-0 p-0 cursor-grab active:cursor-grabbing justify-center select-none relative overflow-hidden flex max-w-full duration-500 sm:opacity-20 zoomIn"
              }
              key={index}
              onClick={handleZoomIn}
              onMouseMove={handleMouseMove}
            >
              <img
                src={image}
                className="absolute aspect-auto object-cover w-full h-full blur-3xl brightness-50 border-0"
                alt={`Project ${index + 1} background`}
              />
              <img
                src={image}
                className="max-w-screen max-h-screen carouselImage md:max-h-[calc(100vh-20px)] object-contain z-10 border-0 transition"
                alt={`Project ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {scrollSnaps.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
            {renderDots()}
          </>
        )}
      </Carousel>
    );
  }
});
