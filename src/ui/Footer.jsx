import { Link } from "react-router-dom";
import Copyright from "./Copyright";

function Footer() {
  return (
    <footer className='bg-[#192836] flex flex-col items-center sm:flex-row sm:items-center sm:justify-between border-t-2 border-t-[#192836] px-10 py-5 space-y-2 sm:space-y-0'>
      <Copyright />
      <Link
        to='/login'
        className='font-semibold text-stone-300'
      >
        Login
      </Link>
    </footer>
  );
}

export default Footer;
