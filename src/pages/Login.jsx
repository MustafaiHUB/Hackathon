import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../authentication/Login/LoginForm";
import LoginHeader from "../authentication/Login/LoginHeader";

function Login() {
  // check if the user is already logged in
  const navigate = useNavigate();
  useEffect(
    function () {
      localStorage.removeItem("email");
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        navigate("/chatbot/new");
      } else {
        navigate("/login");
      }
    },
    [navigate]
  );

  return (
    <div className='grid place-items-center py-24 bg-[#192836] min-h-[100dvh] px-5'>
      <div className='space-y-10 px-5 sm:px-10 py-20 bg-gray-900 rounded-xl w-full max-w-[450px]'>
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
