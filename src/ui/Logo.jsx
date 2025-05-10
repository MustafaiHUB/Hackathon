import { Link } from "react-router-dom";

function Logo({ className }) {
  return (
    <Link to='/'>
      <img
        src='/Eng_Logo.png'
        alt='Eng_Logo'
        className={className}
      />
    </Link>
  );
}

export default Logo;
