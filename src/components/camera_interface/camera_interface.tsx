import React, { Fragment, useEffect, useState } from 'react';
import CaptureButton from './components/capture_button';

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
    if (image instanceof Blob) {
      setImageBase64(URL.createObjectURL(image as Blob));
    } else if (typeof image === 'string') {
      setImageBase64(image);
    } else if (image instanceof HTMLCanvasElement) {
      setImageBase64(image.toDataURL());
    }
  }, [image]);

  return (
    <Fragment>
      {imageBase64 && (
        <div className={`absolute bottom-2 left-2 h-0 w-[15%] pt-[15%] max-h-[7rem] max-w-[7rem] min-h-[3.5rem] min-w-[3.5rem]`}>
          <img
            className={`absolute bottom-0 left-0 w-full h-full max-h-[7rem] max-w[7rem] min-h-[2rem] min-w-[2rem] object-cover shadow-md rounded-full hover:cursor-pointer`}
            src={imageBase64}
            onClick={openImage}
            alt=""
          />
        </div>
      )}
      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition flex`}>
        <CaptureButton onClick={handleCapture} />
      </div>
    </Fragment>
  );
};

export default CameraInterface;
