import { useState, useEffect } from 'react';

/**
 * This hook returns dimensions of viewport
 *
 * @author [Lukas Bormann]
 */
export function useWindowSize() {
  const triggerRerender = window.matchMedia('(orientation: portrait)').matches;
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [triggerRerender]); // Empty array ensures that effect is only run on mount

  /*
    function changeAspecRatio(){
      setWindowSize({
        width: windowSize.height,
        height: windowSize.width,
      });
    }
    */

  return windowSize;
}

export interface windowSize {
  width: undefined | number,
  height: undefined | number
}