import { useNavigate } from "react-router-dom";
import SignupForm from "../authentication/Signup/SignupForm";
import SignupHeader from "../authentication/Signup/SignupHeader";
import { useEffect } from "react";

function Signup() {
  // check if the user is already logged in
  const navigate = useNavigate();
  useEffect(
    function () {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        navigate("/chatbot/new");
      }
    },
    [navigate]
  );
  return (
    <div className='grid place-items-center py-10  min-h-[100dvh] bg-[#192836] px-5'>
      <div className='space-y-10 px-10 py-10 bg-gray-900 rounded-xl w-full max-w-[450px]'>
        <SignupHeader />
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
