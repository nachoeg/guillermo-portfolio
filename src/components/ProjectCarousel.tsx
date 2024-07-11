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
  useRef,
  useState,
  cloneElement,
} from "react";
import { DotButton, useDotButton } from "./ui/EmblaCarouselDotButton";
import ProjectImage from "./ProjectImage";
import ProjectDashboard from "./ProjectDashboard";

export const ProjectCarousel = forwardRef<
  { handleKeyPress: (event: any) => void },
  {
    id: number;
    images: Image[];
    title: string;
    tags: string[];
    isAuth: boolean;
  }
>(({ id, images, title, tags, isAuth }, ref) => {
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
    }, [api, api?.scrollSnapList().length]);

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

    const renderCounter = () => {
      return (
        <div className="absolute top-6 sm:top-3 left-3 bg-white/80 px-1.5 py-0.5  pointer-events-none tracking-widest rounded-full text-xs dark:bg-black/80">
          {current}/{count}
        </div>
      );
    };

    const renderTitle = () => {
      return (
        <div className="absolute top-6 sm:top-3 w-fit mx-auto inset-x-0 bg-white/80 px-2 py-0.5  pointer-events-none  rounded-full text-sm dark:bg-black/80">
          {title}
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

    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    const handleMouseMove = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number
    ) => {
      if (
        itemsRef.current[index] !== null ||
        itemsRef.current[index] !== undefined
      ) {
        if (itemsRef.current[index]) {
          itemsRef.current[index]?.style.setProperty(
            "--x",
            100 *
              ((event.clientX * 1.5 - (window.innerWidth - event.clientX)) /
                (itemsRef.current[index]?.offsetWidth ?? 1)) +
              "%"
          );
          itemsRef.current[index]?.style.setProperty(
            "--y",
            100 *
              ((event.clientY * 1.5 - (window.innerHeight - event.clientY)) /
                (itemsRef.current[index]?.offsetHeight ?? 1)) +
              "%"
          );
        }
      }
    };

    const handleZoomIn = (event: any, index: number) => {
      const image = itemsRef.current[index]?.querySelector(
        ".carouselImage"
      ) as HTMLElement;
      if (image.style.getPropertyValue("--zoom") === "1.5") {
        image.style.setProperty("--zoom", "1");
        itemsRef.current[index]?.style.setProperty("--cursor", "zoom-in");
      } else {
        image.style.setProperty("--zoom", "1.5");
        itemsRef.current[index]?.style.setProperty("--cursor", "zoom-out");
      }
    };

    return (
      <Carousel
        setApi={setApi}
        opts={{
          skipSnaps: true,
        }}
        className="bg-black min-w-0 overflow-hidden rounded-none md:rounded-xl "
        plugins={[
          WheelGesturesPlugin(),
          ClassNamesPlugin({ snapped: "isSnapped" }),
        ]}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem
              className={
                "rounded-none border-0 p-0 select-none overflow-hidden flex max-w-full duration-500 sm:opacity-20 zoomIn relative justify-center"
              }
              ref={(element) => (itemsRef.current[index] = element)}
              key={index}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleZoomIn(event, index)
              }
              onMouseMove={(
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => handleMouseMove(event, index)}
            >
              <ProjectImage image={image.url} index={index}></ProjectImage>
            </CarouselItem>
          ))}
        </CarouselContent>

        {isAuth && (
          <ProjectDashboard
            id={id}
            title={title}
            current={current}
            count={count}
            tags={tags}
          />
        )}
        {scrollSnaps.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
            {renderDots()}
            {renderCounter()}
          </>
        )}
        {title && renderTitle()}
      </Carousel>
    );
  }
});
