// import { Link } from "react-router-dom";
import CloseSidebarIcon from "../../../icons/CloseSidebarIcon";
// import SearchIcon from "../../../icons/SearchIcon";
// import NewChatIcon from "../../../icons/NewChatIcon";
import { useSidebar } from "../../../context/SidebarContext";

function SidebarHeader() {
  const { closeSidebar } = useSidebar();

  return (
    // <div className=''>
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl font-bold text-stone-200 font-mono'>
          FinAdvisor
        </h2>
      </div>
      <div
        className='flex'
        data-state='closed'
      >
        <button
          className='h-10 rounded-lg px-2 hover:bg-[#212121] transition-all duration-200'
          aria-label='Close sidebar'
          title='Close sidebar'
          data-testid='close-sidebar-button'
          onClick={closeSidebar}
        >
          <CloseSidebarIcon />
        </button>
      </div>
    </div>
  );
}

export default SidebarHeader;
