import { useState } from "react";
import Loading from "./Loading";

function ProjectImage({ image, index }: { image: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <Loading />}
      <img
        src={image}
        className={`absolute aspect-auto object-cover pointer-events-none w-full h-full blur-3xl brightness-50 border-0 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        alt={`Project ${index + 1} background`}
      />
      <img
        src={image}
        onLoad={handleImageLoad}
        className={`max-w-screen max-h-screen carouselImage md:max-h-[calc(100vh-20px)] object-contain z-10 border-0 md:transition ${
          loaded ? "opacity-100" : "opacity-0"
        } `}
        alt={`Project ${index + 1}`}
      />
    </>
  );
}

export default ProjectImage;
