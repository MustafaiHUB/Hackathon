import { Link } from "react-router-dom";

function NewChatButton() {
  return (
    <div className='flex relative my-3'>
      <span className='absolute top-1/2 translate-y-[-50%] left-2'>🤖</span>

      {/* w-full pl-10*/}
      <Link
        to='/chatbot/new'
        className='hover:bg-[#212121] transition-all duration-200 rounded-xl block text-stone-200 pr-4 pl-10 py-3 bg-[#212121]'
      >
        New Chat
      </Link>
    </div>
  );
}

export default NewChatButton;
