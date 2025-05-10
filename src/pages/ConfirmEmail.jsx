import { useEffect } from "react";
import LoaderFullPage from "../ui/LoaderFullPage";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/apiChatbot";
import SpecialText from "../ui/SpecialText";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authentication/userSlice";
function ConfirmEmail() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const signupUser = useSelector((state) => state.user.signupUser);
  const { email, token, user } = signupUser;
  console.log(signupUser);

  useEffect(
    function () {
      const startActivationPolling = async (email, token, user) => {
        const intervalId = setInterval(async () => {
          try {
            const response = await fetch(
              `${BASE_URL}/api/v1/registration/user/status?email=${email}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              if (data.activated) {
                clearInterval(intervalId); // Stop polling
                console.log(
                  "Account activated. Redirecting to chatbot page..."
                );
                console.log(user, token); // user prints the email
                dispatch(login(user, token, []));
                // dispatch(login(user, token, [], []));

                navigate("/chatbot/new");
              }
            } else {
              throw new Error(
                "Failed to check activation status:",
                response.statusText
              );
            }
          } catch (error) {
            console.log(typeof email, user, token);
            console.error("Error:", error);
          }
        }, 5000); // Check every 5 seconds
      };
      startActivationPolling(email, token, user);
    },
    [navigate, email, token, user, dispatch]
  );
  return (
    <div className='relative grid place-items-center h-[100dvh]'>
      <SpecialText className='z-40 -mt-64'>
        Please Confirm Your Email
      </SpecialText>
      <LoaderFullPage />
    </div>
  );
}

export default ConfirmEmail;
