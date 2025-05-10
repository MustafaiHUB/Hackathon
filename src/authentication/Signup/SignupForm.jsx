import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import PasswordInput from "../../ui/PasswordInput";
import { BASE_URL } from "../../services/apiChatbot";
import { useDispatch } from "react-redux";
import { setSignupUser } from "../userSlice";
import Loader from "../../ui/Loader";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function testPassword(password) {
  return passwordRegex.test(password);
}

function SignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordRegix, setShowPasswordRegix] = useState(false);
  const [blindMode, setBlindMode] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  function handleSeePassword() {
    setSeePassword((seePassword) => !seePassword);
  }

  async function handleSubmitSignup(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) return;

    if (!testPassword(password)) {
      setPasswordError(true);
      setShowPasswordRegix(true);
      return;
    }

    try {
      setIsLoading(true);
      // If info is correct
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        blindMode: blindMode,
      };

      // Send to the backend
      const response = await fetch(`${BASE_URL}/api/v1/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        console.log(
          "Registration Failed. Please check your email to activate your account."
        );
      }
      const data = await response.json();

      const signupUser = {
        email: email, // add this
        token: data.token,
        user: {
          firstName: firstName,
          lastName: lastName,
          blindMode: blindMode,
          email: email,
          role: data.role,
          userId: data.userId,
        },
      };

      dispatch(setSignupUser(signupUser));
      console.log(signupUser);

      navigate("/confirm");
      // Send to the backend

      // Clear fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordError(false);
      setSeePassword(false);
      setShowPasswordRegix(false);
      setBlindMode(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmitSignup}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InputField
        type='text'
        placeholder='First Name'
        value={firstName}
        onChange={setFirstName}
        id='first_name'
      />
      <InputField
        type='text'
        placeholder='Last Name'
        value={lastName}
        onChange={setLastName}
        id='last_name'
      />
      <InputField
        type='email'
        placeholder='example@email.com'
        value={email}
        onChange={setEmail}
        id='email'
      />
      <PasswordInput
        placeholder='Your Password'
        password={password}
        setPassword={setPassword}
        showPasswordRegix={showPasswordRegix}
        setShowPasswordRegix={setShowPasswordRegix}
        passwordError={passwordError}
        seePassword={seePassword}
        handleSeePassword={handleSeePassword}
        showPasswordMarker={true}
      />

      {/* <InputField> */}
      <Button
        type='primary'
        disabled={isLoading}
        className='flex justify-center mt-10'
      >
        {!isLoading ? "Register" : <Loader />}
      </Button>
      {/* </InputField> */}
    </motion.form>
  );
}

export default SignupForm;
