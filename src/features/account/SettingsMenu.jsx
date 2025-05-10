import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "../../context/SidebarContext";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { logout, changeUserLanguageTTS } from "../../authentication/userSlice";
import { useChatActions } from "../../hooks/useChatActions";
import { useState } from "react";
import Loader from "../../ui/Loader";

function SettingsMenu() {
  const [isDeletingAllChats, setIsDeletingAllChats] = useState(false);
  const userLanguageTTS = useSelector((state) => state.user.userLanguageTTS);
  const userId = useSelector((state) => state.user.userId);
  console.log(userLanguageTTS);
  const navigate = useNavigate();
  const { handleCloseSettings } = useSidebar();
  const dispatch = useDispatch();
  const { deleteAllChatsHandler } = useChatActions();
  function handleLogout() {
    dispatch(logout());
    navigate("/login", replace);
  }
  function handleDeleteAllChats() {
    setIsDeletingAllChats(true);
    deleteAllChatsHandler(userId);
  }
  function handleChangeLanguage(e) {
    dispatch(changeUserLanguageTTS(e.target.value));
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className='bg-[#282a2c] absolute max-w-[500px] w-[100%] h-fit max-h-[500px] z-50 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-xl p-5 text-stone-200 divide divide-y-2 divide-gray-500'
      >
        <motion.div className='flex items-center justify-between pb-5'>
          <h4 className=''>Settings</h4>
          <span
            onClick={handleCloseSettings}
            className='rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-red-700 hover:bg-red-400 transition-all duration-300'
          >
            X
          </span>
        </motion.div>
        <motion.div className='flex items-center justify-between py-5'>
          <h4 className=''>Choose language for speech</h4>
          <select
            className='bg-[#323232] text-stone-200 px-3 py-1.5 rounded-md'
            onChange={handleChangeLanguage}
            value={userLanguageTTS}
            name='language'
            id='language'
          >
            <option value='ar-JO'>Arabic</option>
            <option value='en-US'>English</option>
          </select>
        </motion.div>
        <motion.div className='flex items-center justify-between py-5'>
          <h4 className=''>Delete all chats</h4>
          {!isDeletingAllChats ? (
            <Button
              type='secondary'
              onClick={handleDeleteAllChats}
            >
              Delete
            </Button>
          ) : (
            <Loader />
          )}
        </motion.div>
        <motion.div className='pt-5'>
          <Button
            type='primary'
            onClick={handleLogout}
          >
            Log out
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SettingsMenu;
