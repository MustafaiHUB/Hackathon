import { NavLink } from "react-router-dom";

function HeaderMenu() {
  return (
    <nav>
      <ul className='space-x-4'>
        <NavLink
          to='/login'
          className='font-semibold text-stone-200 '
        >
          Login
        </NavLink>
      </ul>
    </nav>
  );
}

export default HeaderMenu;
