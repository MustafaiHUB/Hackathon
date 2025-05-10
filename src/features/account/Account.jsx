import { motion, AnimatePresence } from "framer-motion";
import Button from "../../ui/Button";
import AccountMenuButton from "./AccountMenuButton";
import SettingsIcon from "../../icons/SettingsIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import { useSidebar } from "../../context/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../authentication/userSlice";
import { replace, useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const { firstName, lastName, email } = user;
  const { handleOpenSettings, openAccountMenu, handleOpenAccountMenu } =
    useSidebar();

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
    navigate("/login", replace);
  }

  return (
    <div className='absolute bottom-2 left-[1rem] w-[calc(100%-2rem)]'>
      <AnimatePresence>
        {openAccountMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='absolute w-full top-[-12.2rem] bg-[#212121] text-stone-200 space-y-3 px-5 py-5 z-50 rounded-xl'
            aria-checked={openAccountMenu}
          >
            <h3 className='text-sm border-b-2 pb-3 text-center'>{email}</h3>
            <div className='space-y-3'>
              <Button
                type='primary'
                className='hover:bg-gray-600 transition-all duration-300'
                onClick={handleOpenSettings}
              >
                <div className='flex items-center space-x-2 justify-center'>
                  <SettingsIcon />
                  <span>Settings</span>
                </div>
              </Button>
              <Button
                type='primary'
                className='hover:bg-gray-600 transition-all duration-300'
                onClick={handleLogout}
              >
                <div className='flex items-center space-x-2 justify-center'>
                  <LogoutIcon />
                  <span>Log out</span>
                </div>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AccountMenuButton
        handleOpenAccountMenu={handleOpenAccountMenu}
        openAccountMenu={openAccountMenu}
        firstName={firstName}
        lastName={lastName}
      />
    </div>
  );
}

export default Account;
