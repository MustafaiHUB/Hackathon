import { Outlet, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../features/Chatbot/Sibebar/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import SmallScreenHeader from "../features/Chatbot/Chat/SmallScreenHeader";
import SettingsMenu from "../features/account/SettingsMenu";
import Overlay from "../ui/Overlay";
import { useEffect } from "react";

function Chatbot() {
  const navigate = useNavigate();
  const { isOpen, openSettings } = useSidebar();

  useEffect(
    function () {
      navigate("/chatbot/new");
    },
    [navigate]
  );

  return (
    <div className='bg-[#212121] h-[100dvh] w-full flex relative'>
      {isOpen && <Sidebar />}
      <main className='relative flex-1 h-[100dvh] grid grid-rows-[auto_1fr_auto] scrollbar'>
        <SmallScreenHeader />
        {/* {!isOpen ? <SmallScreenHeader /> : <div></div>} */}

        <Outlet />

        {/* {id.chatId === undefined && <NewChat />} */}

        {/* <div className='px-5'>
          <TextareaField />
        </div> */}
      </main>

      <>
        {(openSettings || isOpen) && <Overlay />}
        {openSettings && <SettingsMenu />}
      </>
    </div>
  );
}
export function loader() {
  console.log("Question Loader");
  // Load the question list in the sidebar from the backend
  return null;
}
export default Chatbot;
