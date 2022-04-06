import { useState, useEffect, SetStateAction } from 'react';

/**
 * Subscribes to the devices MediaStreams and closes all streams when closed itself
 **/
export function useUserMedia(requestedMedia: MediaStreamConstraints | undefined) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isNotSupported, setIsNotSupported] = useState<boolean>(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function enableVideoStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        if (isMounted) setMediaStream(stream);
      } catch (err) {
        handleError(err as Error, setIsNotSupported, setIsPermissionDenied);
      }
      return () => { isMounted = false };
    }

    async function disableVideoStream() {
      if (!mediaStream) return null;

      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          mediaStream.removeTrack(track);
          track.stop();
        });
      };
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      disableVideoStream();
    }
  }, [mediaStream, requestedMedia]);

  return { mediaStream, isNotSupported, isPermissionDenied };
}

const handleError = (
  error: Error,
  setNotSupported: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setPermissionDenied: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  console.error(error);

  if (error.name === 'PermissionDeniedError') {
    setPermissionDenied(true);
  } else {
    setNotSupported(true);
  }
};
