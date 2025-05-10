import { Link } from "react-router-dom";

function Button({ children, type, disabled, to, onClick, className }) {
  const BASE_BUTTON_STYLE =
    "text-stone-200 bg-gray-800 hover:bg-gray-600 transition-all duration-300 ";
  const styles = {
    primary:
      BASE_BUTTON_STYLE +
      "py-3 rounded-md w-full " +
      `${className ? className : ""}`,
    secondary:
      BASE_BUTTON_STYLE +
      "cursor-pointer hover:bg-gray-600 px-3 py-1.5 rounded-md transition-all duration-300",
    small: BASE_BUTTON_STYLE,
    chat: "flex items-center bg-[#212121] transition-all duration-200 rounded-xl text-sm text-stone-200 px-2 py-2 inline-block w-full z-30",
  };

  if (!type) {
    return (
      <button
        type='button'
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        // className={className}
        className={className || styles[type]}
      >
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={styles[type]}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type='submit'
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default Button;
