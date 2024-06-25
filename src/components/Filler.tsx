import { useEffect, useLayoutEffect, useState } from "react";

export default function Filler() {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    const filler = document.querySelector("#filler") as HTMLElement; // Explicitly type filler as HTMLElement
    if (filler) {
      filler.style.paddingTop = `${headerHeight}px`;
    }
  }, [useWindowSize()]);

  return <div id="filler" className={`transition-all duration-500 `}></div>;
}
