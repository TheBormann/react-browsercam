import React, { Fragment, useEffect, useState } from 'react';
import CaptureButton from './capture_button';

/**
 * @author [Lukas Bormann]
 */
type Props = {
  handleCapture: () => void;
  image: Blob | HTMLCanvasElement | string | null;
  openImage: () => void;
};
const CameraInterface = ({ handleCapture, image, openImage }: Props) => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  useEffect(() => {
    if (image instanceof  Blob){
      setImageBase64(URL.createObjectURL(image as Blob));
    }else if ( typeof image === "string"){
      setImageBase64(image);
    }else if (image instanceof HTMLCanvasElement) {
      setImageBase64(image.toDataURL());
    }
  }, [image]);

  return (
    <Fragment>
      {imageBase64 && (
        // TODO: make image button size, dependent on parent size
        <img
          className={`absolute bottom-2 left-2 w-16 h-16 rounded-lg object-cover hover:cursor-pointer `}
          src={imageBase64}
          onClick={openImage}
        />
      )}
      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition flex`}>
        <CaptureButton onClick={handleCapture} />
      </div>
    </Fragment>
  );
};

export default CameraInterface;
