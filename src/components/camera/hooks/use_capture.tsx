import React from 'react';
import { useEffect, useState } from 'react';
import { useUserMedia } from './use_user_media';
import { useWindowSize } from './use_window_size';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    width: { ideal: 4096 },
    height: { ideal: 4096 },
    facingMode: 'environment'
  }
};

/**
 * This hook returns a captured image
 *
 * @author [Lukas Bormann]
 */
export const useCapture = (captureOptions = CAPTURE_OPTIONS) => {
  const [image, setImage] = useState<Blob | null>(null);

  const video = document.createElement('video');
  const videoRef = React.useRef<HTMLVideoElement>(video);
  const wSize = useWindowSize();
  const mediaStream = useUserMedia(captureOptions);

  // Check for availability of the mediastream
  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const capture = () => {
    if (mediaStream === null) return

    const dimensions = calculateNewDimensions(
      mediaStream.getVideoTracks()[0].getSettings().width,
      mediaStream.getVideoTracks()[0].getSettings().height,
      wSize.width,
      wSize.height
    );

    const offsets = calculateOffsets(
      mediaStream.getVideoTracks()[0].getSettings().width,
      mediaStream.getVideoTracks()[0].getSettings().height,
      dimensions.width,
      dimensions.height
    );

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) return
    context.canvas.width = dimensions.width;
    context.canvas.height = dimensions.height;
    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      dimensions.width,
      dimensions.height,
      0,
      0,
      dimensions.width,
      dimensions.height
    );

    // canvas.toBlob is used instead of canvas.toDataURL(), because it reduces the compute time by at least 3x
    canvas.toBlob((blob) => setImage(blob), 'image/jpeg', 1);
  };

  // Calculate new size of the image
  function calculateNewDimensions(imgWidth: number | undefined, imgHeight: number | undefined, screenWidth: number | undefined, screenHeight: number | undefined) {
    if (imgWidth && imgHeight && screenWidth && screenHeight) {
      const aspectRatioW = screenWidth / screenHeight;
      const aspectRatioH = screenHeight / screenWidth;

      if (aspectRatioW < 1.5) {
        return { width: Math.trunc(aspectRatioW * imgHeight), height: imgHeight };
      } else {
        return { width: imgWidth, height: Math.trunc(aspectRatioH * imgWidth) };
      }
    }
    console.log("Aspect Ratio couldn't get calculated");
    return { width: 0, height: 0 };
  }

  // Calculate offsets to center container
  function calculateOffsets(dWidth: number | undefined, dHeight: number | undefined, wantedWidth: number | undefined, wantedHeight: number | undefined) {
    if (dWidth && dHeight && wantedWidth && wantedHeight) {
      const x = dWidth > wantedWidth ? Math.round((dWidth - wantedWidth) / 2) : 0;
      const y = dHeight > wantedHeight ? Math.round((dHeight - wantedHeight) / 2) : 0;
      return { x, y };
    }
    console.log('Offsets could not get calculated!');
    return { x: 0, y: 0 };
  }

  return {
    image,
    isAccessingCamera: mediaStream === null ? false : true,
    videoRef,
    capture
  };
};
