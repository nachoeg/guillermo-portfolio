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
            <div className="">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0 rounded-b cursor-grab  active:cursor-grabbing  select-none overflow-clip">
                  <img
                    src={image}
                    className="rounded-b hover:scale-105  transition duration-200 "
                    alt={`Project ${index + 1}`}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
