import { memo } from "react";

function UserMessage({ question }) {
  return (
    <div className='w-fit ml-auto mb-4 flex items-start gap-2'>
      <span className='bg-[#323232d9] rounded-md px-4 py-2'>{question}</span>
      <span>🧑‍🦲</span>
    </div>
  );
}

export default memo(UserMessage);
