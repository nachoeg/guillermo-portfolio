import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselProject({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full max-w-xl">
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
    </Carousel>
  );
}
