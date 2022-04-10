import React, { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import Flash from './components/flash';
import FullScreenButton from './components/full_screen_button';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

/**
 * Camera app component
 *
 * @author [Lukas Bormann]
 */
type Props = {
  videoRef: RefObject<HTMLVideoElement>;
  isAccessingCamera: boolean;
  objectFit?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down';
  fullscreen?: boolean;
  flash: Dispatch<SetStateAction<() => void>>;
  inPicture?: boolean;
  children: React.ReactNode | React.ReactNode[];
};

const Camera = ({videoRef, isAccessingCamera,  objectFit = 'cover', fullscreen = true, children, flash, inPicture = true }: Props) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const handleFullscreen = useFullScreenHandle();

  // provides the useCapture hook with the camera flash function
  useEffect(() => {
    return flash(() => () => setIsFlashing(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // only displays camera is mediastream is accessible
  function handleCanPlay() {
    setIsVideoPlaying(true);
  }

  /**
   * Loading screen
   */
  if (!isAccessingCamera) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center`}>
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="mt-3">Accessing Camera</h3>
      </div>
    );
  }

  /**
   * Camera element
   */
  return (
    <FullScreen handle={handleFullscreen} className={`relative w-full h-full overflow-hidden `}>
      <video
        ref={videoRef}
        onCanPlay={handleCanPlay}
        hidden={!isVideoPlaying}
        autoPlay
        playsInline
        muted
        className={`relative z-0 ${inPicture === false ? 'h-full' : 'h-full'} w-full object-${objectFit} object-center`}
      />

      <Flash flash={isFlashing} onAnimationEnd={() => setIsFlashing(false)} />

      {/*navigation*/}
      {fullscreen && (
          <div className={`absolute top-1 left-1`}>
            <FullScreenButton
              onClick={() =>
                handleFullscreen.active ? handleFullscreen.exit() : handleFullscreen.enter()
              }
            />
          </div>
        )}
      <div className={`absolute z-10 w-full h-full`}>
        {!inPicture && children}
      </div>
      {inPicture && children}
    </FullScreen>
  );
};

Camera.displayName = 'Camera';

export default Camera;
