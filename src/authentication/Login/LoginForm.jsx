import { useState } from "react";
import { useDispatch } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import PasswordInput from "../../ui/PasswordInput";
import { BASE_URL } from "../../services/apiChatbot";
import { login } from "../userSlice";
import Loader from "../../ui/Loader";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSeePassword() {
    setSeePassword((seePassword) => !seePassword);
  }

  async function handleSubmitLogin(e) {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setIsLoading(true);
      // If info is correct
      const user = {
        email: email,
        password: password,
      };

      // Send to the backend
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to login!");
      }

      const data = await response.json();
      console.log(data);

      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        blindMode: data.blind,
        userId: data.userId,
        role: data.role,
      };

      const token = data.token;
      const conversations = data.conversations;
      dispatch(login(newUser, token, conversations));
      navigate("/chatbot/new");
      console.log(conversations);

      // Clear fields
      setEmail("");
      setPassword("");
      setSeePassword(false);
    } catch (err) {
      console.error(err.message);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmitLogin}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InputField
        type='email'
        id='email'
        placeholder='example@email.com'
        value={email}
        onChange={setEmail}
      />
      <PasswordInput
        type='password'
        id='password'
        placeholder='Your Password'
        value={password}
        setPassword={setPassword}
        showPasswordMarker={false}
        seePassword={seePassword}
        handleSeePassword={handleSeePassword}
      />

      <div className='w-fit ml-auto'>
        <Button
          className='text-stone-200 mb-5 mt-1'
          onClick={() => navigate("/forgot", replace)}
        >
          Forgot Password?
        </Button>
      </div>

      <Button
        type='primary'
        disabled={isLoading}
        className='flex justify-center'
      >
        {!isLoading ? "Login" : <Loader />}
      </Button>
    </motion.form>
  );
}

export default LoginForm;
