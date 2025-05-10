import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import PasswordIcon from "../icons/PasswordIcon";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/apiChatbot";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [showPasswordRegix, setShowPasswordRegix] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();
  useEffect(
    function () {
      const email = localStorage.getItem("email");
      if (!email) navigate(-1);
    },
    [navigate]
  );
  function handleSeePassword() {
    setSeePassword((seePassword) => !seePassword);
  }
  function handleSeeConfirmPassword() {
    setSeeConfirmPassword((seeConfirmPassword) => !seeConfirmPassword);
  }

  async function handleSubmitNewPassword(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowPasswordRegix(true);
      return;
    }

    try {
      setIsLoading(true);

      const res = await changePassword(password);

      console.log(res);
      setPasswordChanged(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='bg-[#192836] h-[100dvh] grid place-items-center'>
      <div className='mx-3'>
        <div className='text-center text-slate-300'>
          <div className='bg-purple-900 w-fit p-3 rounded-full mx-auto'>
            <PasswordIcon />
          </div>
          <h2 className='font-semibold text-3xl my-3'>Set New Password</h2>
        </div>
        <div className='bg-gray-900 mt-6 p-10 rounded-xl'>
          {passwordChanged ? (
            <p className='text-stone-200 font-semibold'>
              Your password has changed
            </p>
          ) : (
            <motion.form
              onSubmit={handleSubmitNewPassword}
              className='space-y-5'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <PasswordInput
                placeholder='Enter New Password'
                value={password}
                showPasswordRegix={showPasswordRegix}
                setShowPasswordRegix={setShowPasswordRegix}
                setPassword={setPassword}
                showPasswordMarker={true}
                seePassword={seePassword}
                handleSeePassword={handleSeePassword}
              />
              <PasswordInput
                placeholder='Re-enter Password'
                value={confirmPassword}
                setPassword={setConfirmPassword}
                showPasswordMarker={false}
                seePassword={seeConfirmPassword}
                handleSeePassword={handleSeeConfirmPassword}
              />
              <Button
                type='primary'
                disabled={isLoading}
                className='flex justify-center'
              >
                {!isLoading ? "Change Password" : <Loader />}
              </Button>
            </motion.form>
          )}
        </div>
        <Button
          type='primary'
          to='/login'
          className='flex justify-center mt-5 text-stone-300'
        >
          {`<- Back to login`}
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;
