import { Link } from "react-router-dom";
import RobotIcon from "../../icons/RobotIcon";

function LoginHeader() {
  return (
    <div className='text-center'>
      <RobotIcon />
      <h1 className='text-stone-200 text-2xl font-semibold pt-5'>
        Welcome Back
      </h1>
      <p className='text-sm text-stone-400'>
        Don't have an account yet?{" "}
        <Link
          to='/signup'
          className='text-stone-200'
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginHeader;
