
import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024, 
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsAboveBreakpoint(window.innerWidth >= breakpoints[breakpoint]);
    };
    
    // Initial check
    checkSize();
    
    // Add event listener
    window.addEventListener("resize", checkSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkSize);
  }, [breakpoint]);

  return isAboveBreakpoint;
}
