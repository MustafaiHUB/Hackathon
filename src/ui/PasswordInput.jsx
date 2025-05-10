import { motion } from "framer-motion";
import PasswordIcon from "../icons/PasswordIcon";
import SeePasswordIcon from "../icons/SeePasswordIcon";
import UnSeePasswordIcon from "../icons/UnSeePasswordIcon";

function PasswordInput({
  password,
  setPassword,
  passwordError,
  showPasswordRegix,
  setShowPasswordRegix,
  seePassword,
  handleSeePassword,
  showPasswordMarker,
  className,
  placeholder,
}) {
  return (
    <motion.div
      className={`relative ${className ? className : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <label
        htmlFor='password'
        className='absolute top-3.5 left-2 cursor-pointer'
      >
        <PasswordIcon />
      </label>
      <input
        placeholder={placeholder}
        type={`${seePassword ? "text" : "password"}`}
        id='password'
        name='password'
        className={`border-none outline-none px-10 py-3 bg-gray-800 text-stone-100  rounded-md focus:ring-2 transition-all duration-300 w-full ${
          passwordError ? "ring-2 ring-red-500" : "ring-gray-200"
        }`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {showPasswordMarker && (
        <span
          onClick={() => setShowPasswordRegix((show) => !show)}
          className='text-[10px] absolute cursor-pointer top-1 left-[-20px] border-2 rounded-full'
        >
          ❕
        </span>
      )}

      {showPasswordRegix && (
        <p className='text-stone-200 text-xs py-2'>
          Your password must contain:
          <br />
          At least 8 characters long
          <br />
          At least one upper character
          <br />
          At least one lower character
          <br />
          At least one special character
          <br />
          At least one number
        </p>
      )}

      {/* Unsee password svg */}
      {!seePassword && (
        <UnSeePasswordIcon handleSeePassword={handleSeePassword} />
      )}

      {/* See password svg */}
      {seePassword && <SeePasswordIcon handleSeePassword={handleSeePassword} />}
    </motion.div>
  );
}

export default PasswordInput;
