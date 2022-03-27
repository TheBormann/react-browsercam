import React from 'react';

/**
 * @author [Lukas Bormann]
 */
type Props = {
  onClick: () => void;
};
//TODO change button to photobutton
const FullScreenButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`group p-0 w-10 h-10 opacity-25 bg-slate-400 rounded-full hover:bg-slate-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 inline-block stroke-slate-600 group-hover:stroke-slate-900 transition ease-in duration-200"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </button>
  );
};

export default FullScreenButton;