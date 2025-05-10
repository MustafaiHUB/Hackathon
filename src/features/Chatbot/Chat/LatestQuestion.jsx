import { useEffect, useRef } from "react";
import Loader from "../../../ui/Loader";

function LatestQuestion({ latestQuestion }) {
  const chatEndRef = useRef(null);
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      console.log("scrolled");
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [latestQuestion]);
  return (
    <div className='mb-4 border-b border-b-gray-500 pb-4'>
      <div className='w-fit ml-auto mb-4 flex items-start gap-2'>
        <span className='bg-[#323232d9] rounded-md px-4 py-2'>
          {latestQuestion}
        </span>
        <span>🧑‍🦲</span>
      </div>
      <div
        ref={chatEndRef}
        className='text-justify flex items-center gap-4'
      >
        <span className=''>🤖</span>
        <Loader />
      </div>
    </div>
  );
}

export default LatestQuestion;
