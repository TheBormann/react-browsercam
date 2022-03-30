import React from 'react';

/**
 * @author [Lukas Bormann]
 */
type Props = {
  bg_color?: string;
  color?: string;
  onClick: () => void;
};
//TODO change button to photobutton
const CaptureButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 p-0 m-1 bg-transparent rounded-full focus:outline-none`}>
      <svg className={"h-fit w-fit"} viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg" fill='none'>
        <circle className={`fill-white`} cx="158" cy="158" r="139" />
        <circle className={`stroke-white`} cx="158" cy="158" r="155.5" strokeWidth="5" />
      </svg>
    </button>
  );
};

export default CaptureButton;
