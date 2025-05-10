import { motion } from "framer-motion";
import SpecialText from "../ui/SpecialText";
import InputField from "../ui/InputField";
import { useState } from "react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import PasswordIcon from "../icons/PasswordIcon";
import { resetPassword } from "../services/apiChatbot";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitChangePassword(e) {
    e.preventDefault();
    setEmailError(false);
    setIsSubmit(false);
    if (!email) {
      setEmailError(true);
      return;
    }

    try {
      setIsLoading(true);
      const res = await resetPassword(email);

      console.log(res);
      localStorage.setItem("email", email);
      setIsSubmit(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    console.log(email);
  }
  return (
    <div className='bg-[#192836] h-[100dvh] grid place-items-center'>
      <div className='mx-3'>
        <div className='text-center text-slate-300'>
          <div className='bg-purple-900 w-fit p-3 rounded-full mx-auto'>
            <PasswordIcon />
          </div>
          <h2 className='font-semibold text-3xl my-3'>Forgot Password?</h2>
          <p>No worries, we'll send you reset instructions.</p>
        </div>
        <div className='bg-gray-900 mt-6 p-10 rounded-xl'>
          {isSubmit ? (
            <p className='text-stone-200 font-semibold'>
              Your email has been submitted, please check you mail.
            </p>
          ) : (
            <>
              <SpecialText className='mb-10'>Enter your email</SpecialText>
              <motion.form
                onSubmit={handleSubmitChangePassword}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {emailError && (
                  <p className='text-red-700 font-bold mb-1'>
                    Please submit a valid email
                  </p>
                )}
                <InputField
                  type='email'
                  id='email'
                  className={`${emailError ? "ring-1 ring-red-500" : ""}`}
                  placeholder='example@email.com'
                  value={email}
                  onChange={setEmail}
                />
                <Button
                  type='primary'
                  disabled={isLoading}
                  className='flex justify-center'
                >
                  {!isLoading ? "Send Email" : <Loader />}
                </Button>
              </motion.form>
            </>
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

export default ForgotPassword;
