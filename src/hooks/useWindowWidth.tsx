import { useEffect, useState } from "react";

type UseWindowWidthOptions = {
  callback?: (width: number) => void;
};

export function useWindowWidth({ callback }: UseWindowWidthOptions) {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      // If a callback was provided, run it
      if (callback) {
        callback(newWidth);
      }
    }

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
