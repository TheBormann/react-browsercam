import React, { useEffect, useState } from 'react';

type Props = {
  image: Blob | HTMLCanvasElement | string | null;
  visible: boolean;
  inCameraBounds?: boolean;
  handleClose: () => void;
};

const ImgDetailPopup = ({ image, visible, inCameraBounds = true, handleClose }: Props) => {
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

  if (imageBase64 === null || !visible) return <div />;

  return (
    <div className={`absolute ${inCameraBounds && "h-full w-full"} ${!inCameraBounds &&  "h-screen w-screen"} overflow-hidden flex items-center justify-center z-20 bg-black bg-opacity-50`}>
      <img className={`w-[80%] h-[80%] object-contain`} src={imageBase64} alt="" />

      <button
        onClick={handleClose}
        className={`absolute top-2 right-2 inline-flex items-center justify-center w-10 h-10 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-full focus:shadow-outline hover:bg-gray-800`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ImgDetailPopup;
