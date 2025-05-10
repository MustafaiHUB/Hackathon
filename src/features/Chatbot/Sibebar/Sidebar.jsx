import { motion, AnimatePresence } from "framer-motion";
import SidebarHeader from "./SidebarHeader";
import Questions from "./Questions";
import Account from "../../account/Account";
import NewChatButton from "../../../ui/NewChatButton";

function Sidebar() {
  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className='bg-[#282a2c] px-4 py-4 scrollbar w-full max-w-[20rem] h-full z-40 fixed'
      >
        <SidebarHeader />
        <NewChatButton />
        <Questions />
        <Account />
      </motion.aside>
    </AnimatePresence>
  );
}

export default Sidebar;
