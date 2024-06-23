import { useEffect, useState } from "react";
import Loading from "./Loading";

function ProjectThumbnail({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <>
      {!loaded && <Loading />}
      <img
        src={src}
        className={`cursor-pointer transition duration-500 group-hover:brightness-75 object-cover object-center w-full z-10  ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        alt={"Project: " + alt}
      />
    </>
  );
}

export default ProjectThumbnail;
