import { useState, useEffect, SetStateAction } from 'react';

/**
 * Subscribes to the devices MediaStreams and closes all streams when closed itself
 **/
export function useUserMedia(requestedMedia: MediaStreamConstraints | undefined) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [notSupported, setNotSupported] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  useEffect(() => {
    async function enableVideoStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch (err) {
        handleError(err as Error, setNotSupported, setPermissionDenied);
      }
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

  return { mediaStream, notSupported, permissionDenied };
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
