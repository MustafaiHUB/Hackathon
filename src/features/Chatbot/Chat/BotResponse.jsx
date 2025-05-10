import { memo } from "react";
import CopyIcon from "../../../icons/CopyIcon";

function cleanText(text) {
  if (!text) return;
  text = text
    .replace(/【.*?】/g, "")
    .replace(/\*/g, "")
    .replace(/#/g, "");
  return text;
}
function BotResponse({ answer, handleCopy, response_id }) {
  return (
    <>
      {/* {!blindMode && ( */}
      <div className='text-justify flex items-start gap-2 relative'>
        <span>🤖</span>
        <div className='flex flex-col gap-1'>
          {answer.includes("Try again") ? (
            <pre className='whitespace-pre-wrap font-mono text-stone-300 bg-red-700 px-2 py-1 rounded-md'>
              {cleanText(answer)}
            </pre>
          ) : (
            <pre className='whitespace-pre-wrap font-mono'>
              {cleanText(answer)}
            </pre>
          )}
          {/* Copy Icon */}
          <button
            onClick={() => handleCopy(cleanText(answer))}
            className='w-fit text-white text-sm opacity-70 hover:opacity-100 transition'
            title='Copy'
          >
            <CopyIcon />
          </button>
        </div>
      </div>
      {/* )} */}
      {/* Audio Player for blind support */}
      {/* {blindMode && (
        <audio
          controls
          autoPlay
          className='w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <source
            src={`http://localhost:5000/audio/output_${response_id}.mp3`}
            type='audio/mp3'
          />
          Your browser does not support the audio element.
        </audio>
      )} */}
    </>
  );
}

export default memo(BotResponse);
