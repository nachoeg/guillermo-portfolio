import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function CarouselProject({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < count; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => api?.scrollTo(i)}
          className={`size-1.5 rounded-full mx-0.5 shadow shadow-neutral-700 ${
            current === i + 1 ? "bg-neutral-50" : "bg-neutral-50/30"
          }`}
        />
      );
    }
    return buttons;
  };

  return (
    <Carousel setApi={setApi} className="w-full max-w-xl relative">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent
                className={`flex aspect-square p-0 justify-center cursor-grab  active:cursor-grabbing  select-none overflow-clip  relative`}
              >
                <img
                  src={image}
                  className=" absolute aspect-auto object-cover w-full h-full blur-3xl brightness-150 "
                  alt={`Project ${index + 1}`}
                />
                <img
                  src={image}
                  className=" hover:scale-105   transition duration-200 object-contain z-10"
                  alt={`Project ${index + 1}`}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="absolute bottom-3 place-self-center inset-x-0">
        {renderButtons()}
      </div>
    </Carousel>
  );
}
