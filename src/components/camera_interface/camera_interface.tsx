import React, { Fragment, useEffect, useState } from 'react';
import CaptureButton from './components/capture_button';

/**
 * @author [Lukas Bormann]
 */
type Props = {
  handleCapture: () => void;
  image: Blob | HTMLCanvasElement | string | null;
  openImage: () => void;
  children: React.ReactNode | React.ReactNode[];
};
const CameraInterface = ({ handleCapture, image, openImage, children }: Props) => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  useEffect(() => {
    if (image instanceof Blob) {
      setImageBase64(URL.createObjectURL(image as Blob));
    } else if (typeof image === 'string') {
      setImageBase64(image);
    } else if (image instanceof HTMLCanvasElement) {
      setImageBase64(image.toDataURL());
    }
  }, [image]);

  return (
    <div className={`p-1 z-10 w-full grid grid-cols-3`}>
      {imageBase64 && (
        <div className={`col-start-1 justify-self-start self-center w-2/3 h-2/3 max-h-[8rem] max-w-[8rem] min-h-[3rem] min-w-[3rem]`}>
          <img
            className={`w-full h-full clip-image shadow-md hover:cursor-pointer`}
            src={imageBase64}
            onClick={openImage}
            alt=""
          />
        </div>
      )}
      <div className={`col-start-2 self-center justify-self-center flex items-center`}>
        <CaptureButton onClick={handleCapture} />
      </div>
      {children}
    </div>
  );
};

export default CameraInterface;
