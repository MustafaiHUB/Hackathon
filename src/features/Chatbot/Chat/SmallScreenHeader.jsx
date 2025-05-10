import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../../context/SidebarContext";
import NewChatIcon from "../../../icons/NewChatIcon";
import OpenSidebarIcon from "../../../icons/OpenSidebarIcon";
import { useSelector } from "react-redux";
import Button from "../../../ui/Button";

function SmallScreenHeader() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  console.log(isAdmin);
  const { openSidebar } = useSidebar();
  const navigate = useNavigate();
  function handleNewChat() {
    navigate("/chatbot/new");
  }
  return (
    <div className='flex items-center justify-between px-3 py-4 shadow-md'>
      <div
        className='flex'
        data-state='closed'
      >
        <button
          className='h-10 px-2 hover:bg-[#282a2c] transition-all duration-200 p-2 rounded-lg'
          aria-label='Close sidebar'
          data-testid='close-sidebar-button'
          onClick={openSidebar}
          title='Open sidebar'
          role='button'
        >
          <OpenSidebarIcon />
        </button>
      </div>

      <div className='flex items-center space-x-2'>
        {isAdmin && (
          <Button
            to={"/admin"}
            className='text-stone-200 hover:bg-[#282a2c] transition-all duration-200 p-2 rounded-md'
            type={"primary"}
          >
            {<span>&larr;</span>} Admin Panel
          </Button>
        )}
        <h1 className='text-stone-200 text-xl font-semibold font-mono'>
          FinAdvisor
        </h1>
      </div>

      <div data-state='closed'>
        <button
          className='hover:bg-[#282a2c] transition-all duration-200 p-2 rounded-md'
          aria-label='New chat'
          title='New chat'
          data-testid='create-new-chat-button'
          role='button'
          onClick={handleNewChat}
        >
          <NewChatIcon />
        </button>
      </div>
    </div>
  );
}

export default SmallScreenHeader;
