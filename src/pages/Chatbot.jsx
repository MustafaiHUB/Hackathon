import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../features/Chatbot/Sibebar/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import SmallScreenHeader from "../features/Chatbot/Chat/SmallScreenHeader";
import SettingsMenu from "../features/account/SettingsMenu";
import Overlay from "../ui/Overlay";
import { useEffect } from "react";
import Message from "../ui/Message";
import { useSelector } from "react-redux";
import { useChatActions } from "../hooks/useChatActions";

function Chatbot() {
  const navigate = useNavigate();
  const { setQuestionsHandler } = useChatActions();
  const { isOpen, openSettings } = useSidebar();

  const error = useSelector((state) => state.chat.error);
  useEffect(
    function () {
      const questions = JSON.parse(localStorage.getItem("questions"));
      // const thread_ids = JSON.parse(localStorage.getItem("thread_ids"));
      console.log(questions);
      if (questions) {
        setQuestionsHandler(questions);
      }
      // if (questions && thread_ids) {
      //   setQuestionsHandler(questions, thread_ids);
      // }
      navigate("/chatbot/new");
    },
    [navigate, setQuestionsHandler]
  );

  return (
    <div className='bg-[#212121] h-[100dvh] w-full flex relative'>
      {error && <Message message={error} />}
      {isOpen && <Sidebar />}
      <main className='relative flex-1 h-[100dvh] grid grid-rows-[auto_1fr_auto] scrollbar'>
        <SmallScreenHeader />

        <Outlet />
      </main>

      <>
        {(openSettings || isOpen) && <Overlay />}
        {openSettings && <SettingsMenu />}
      </>
    </div>
  );
}
export default Chatbot;
