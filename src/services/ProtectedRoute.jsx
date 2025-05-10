import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authentication/userSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const token = localStorage.getItem("token");
  const questions = JSON.parse(localStorage.getItem("questions"));
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(isAuthenticated);
  useEffect(
    function () {
      // if (!token && !user) {
      if (!isAuthenticated || !token || !questions || !user) {
        navigate("/login", replace);
      } else {
        dispatch(login(user, token, questions));
      }
    },
    // [navigate, dispatch, isAuthenticated]
    [navigate, user, token, questions, dispatch, isAuthenticated]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
