import React from 'react';

/**
 * @author [Lukas Bormann]
 */
type Props = {
  onClick: () => void;
};
const FullScreenButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`group w-9 h-9 md:w-10 md:h-10 p-0 m-0.5 opacity-50 bg-slate-400 rounded-full hover:bg-slate-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current h-7 w-7 inline-block stroke-slate-600 group-hover:stroke-slate-900 transition ease-in duration-200"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}>
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
