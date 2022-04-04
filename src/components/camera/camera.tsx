import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import Flash from './components/flash';
import { useCapture } from './hooks/use_capture';
import FullScreenButton from './components/full_screen_button';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

/**
 * Camera app component
 *
 * @author [Lukas Bormann]
 */
type Props = {
  objectFit?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down';
  fullscreen?: boolean;
  MediaStreamConstraints?: MediaStreamConstraints;
  imageFormat?: 'image/webp' | 'image/png' | 'image/jpeg';
  imageCompression?: number;
  children?: React.ReactNode | React.ReactNode[];
};

const Camera = React.forwardRef<unknown, Props>(
  (
    { objectFit = 'cover', fullscreen = true, MediaStreamConstraints, imageFormat, imageCompression, children },
    ref
  ) => {
    const { isAccessingCamera, videoRef, capture } = useCapture({
      MediaStreamConstraints,
      imageFormat,
      imageCompression
    });

    const [isFlashing, setIsFlashing] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const handleFullscreen = useFullScreenHandle();

    /**
     * Camera API, provides a capture image function
     */
    useImperativeHandle(ref, () => ({
      takePhoto: (format: 'blob' | 'canvas' | 'base64') => {
        setIsFlashing(true);
        return capture(format);
      }
    }));

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
          className={`absolute z-0 w-full h-full object-${objectFit} object-center`}
        />

        <Flash flash={isFlashing} onAnimationEnd={() => setIsFlashing(false)} />

        {/*navigation*/}
        <div className={`absolute z-10 w-full h-full`}>
          {fullscreen && (
            <div className={`absolute top-1 left-1`}>
              <FullScreenButton
                onClick={() =>
                  handleFullscreen.active ? handleFullscreen.exit() : handleFullscreen.enter()
                }
              />
            </div>
          )}
          {children}
        </div>
      </FullScreen>
    );
  }
);

Camera.displayName = 'Camera';

export default Camera;
