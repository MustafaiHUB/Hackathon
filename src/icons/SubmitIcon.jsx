import { memo } from "react";

function SubmitIcon({ handleQuestion }) {
  return (
    <button
      onClick={handleQuestion}
      data-testid='composer-speech-button'
      aria-label='Start voice mode'
      className='hover:bg-[#212121] transition-all duration-200 rounded-full p-2 absolute top-1/2 translate-y-[-60%] right-2'
      title='Submit'
    >
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g
          id='SVGRepo_bgCarrier'
          strokeWidth='0'
        ></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {" "}
          <path
            fill='none'
            stroke='#d6d3d1'
            strokeWidth='2'
            d='M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8'
          ></path>{" "}
        </g>
      </svg>
    </button>
  );
}

export default memo(SubmitIcon);
