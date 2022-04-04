import React, { Fragment } from 'react';
import CaptureButton from './capture_button';

/**
 * @author [Lukas Bormann]
 */
type Props = {
  handleCapture: () => void;
  image: 'base64' | null;
};
//TODO change button to photobutton
const CameraInterface = ({ handleCapture, image }: Props) => {
  return (
    <Fragment>
      {image && (
        <img
          className={`absolute bottom-2 left-2 w-16 h-16 rounded-lg object-cover hover:cursor-pointer `}
          alt="Preview Image Button"
          src={image}
          onClick={() => {console.log("open Details")}}
        />
      )}
      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition flex`}>
        <CaptureButton onClick={handleCapture} />
      </div>
    </Fragment>
  );
};

export default CameraInterface;
