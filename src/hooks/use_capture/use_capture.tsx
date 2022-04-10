import React, { useState } from 'react';
import { useEffect } from 'react';
import { useUserMedia } from './use_user_media';

const VIDEO_CONSTRAINTS = {
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
type Props = {
  MediaStreamConstraints?: MediaStreamConstraints | undefined;
  imageFormat?: 'image/webp' | 'image/png' | 'image/jpeg';
  imageCompression?: number;
};

export const useCapture = ({
  MediaStreamConstraints = VIDEO_CONSTRAINTS,
  imageFormat = 'image/jpeg',
  imageCompression = 0.91
}: Props) => {
  const [image, setImage] = useState<Blob | HTMLCanvasElement | string | null>(null);
  const video = document.createElement('video');
  const videoRef = React.useRef<HTMLVideoElement>(video);
  const { mediaStream, isNotSupported, isPermissionDenied } = useUserMedia(MediaStreamConstraints);

  const [beforeCapture, setBeforeCapture] = useState<() => void>(() => () => null);
  const [afterCapture, setAfterCapture] = useState<() => void>(() => () => null);

  // stop any active streams in the window
  useEffect(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for availability of the mediastream
  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const capture = (format: 'blob' | 'canvas' | 'base64' = 'blob') => {
    if (mediaStream === null) return;

    beforeCapture();

    const dimensions = calculateNewDimensions(
      mediaStream.getVideoTracks()[0].getSettings().width,
      mediaStream.getVideoTracks()[0].getSettings().height,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    const offsets = calculateOffsets(
      mediaStream.getVideoTracks()[0].getSettings().width,
      mediaStream.getVideoTracks()[0].getSettings().height,
      dimensions.width,
      dimensions.height
    );

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context === null) return;
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

    if (format === 'blob') {
      // canvas.toBlob is used instead of canvas.toDataURL(), because it reduces the compute time
      canvas.toBlob((blob) => setImage(blob), 'image/jpeg', 1);
    } else if (format === 'canvas') {
      setImage(canvas);
    } else {
      setImage(canvas.toDataURL(imageFormat, imageCompression));
    }
    afterCapture();
  };

  // Calculate new size of the image
  function calculateNewDimensions(
    imgWidth: number | undefined,
    imgHeight: number | undefined,
    screenWidth: number | undefined,
    screenHeight: number | undefined
  ) {
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
  function calculateOffsets(
    dWidth: number | undefined,
    dHeight: number | undefined,
    wantedWidth: number | undefined,
    wantedHeight: number | undefined
  ) {
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
    capture,
    isNotSupported,
    isPermissionDenied,
    setBeforeCapture,
    setAfterCapture
  };
};