import { useState } from "react";
import { useChatActions } from "../../../hooks/useChatActions";
import ChatIcon from "../../../icons/ChatIcon";
import Button from "../../../ui/Button";
import Loader from "../../../ui/Loader";

function QuestionItem({ title, id }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { deleteChatHandler } = useChatActions();
  return (
    <div className='flex relative mb-2 mr-2'>
      <div
        className='relative w-full'
        onClick={() => setIsLoading(true)}
      >
        <Button
          to={`/chatbot/${id}`}
          type='chat'
        >
          {!isLoading ? <ChatIcon /> : <Loader />}
          <span className='pl-2 mr-5'>{title}</span>
        </Button>
      </div>
      <div
        onClick={() => {
          setIsDeleting(true);
          deleteChatHandler(id);
        }}
        className={`ml-auto rounded-full ${
          !isDeleting && "bg-red-600 hover:bg-red-400"
        }  transition-all duration-200 h-fit top-1/2 -translate-y-1/2 px-2 flex items-center justify-center z-40 absolute right-1 cursor-pointer`}
      >
        {!isDeleting ? "X" : <Loader />}
      </div>
    </div>
  );
}

export default QuestionItem;
