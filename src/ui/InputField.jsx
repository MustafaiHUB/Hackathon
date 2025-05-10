import { motion } from "framer-motion";
import PersonIcon from "../icons/PersonIcon";
import EmailIcon from "../icons/EmailIcon";
const icons = {
  text: <PersonIcon />,
  email: <EmailIcon />,
};
function InputField({
  type,
  placeholder,
  value,
  onChange,
  id,
  children,
  className,
}) {
  return (
    <motion.div
      className={`relative mb-5 ${className ? className : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {!children ? (
        <>
          <label
            htmlFor={id}
            className='absolute top-3.5 left-2 cursor-pointer'
          >
            {icons[type]}
          </label>
          <input
            placeholder={placeholder}
            type={type}
            id={id}
            name={id}
            className='inputt border-none outline-none pl-10 pr-5 py-3 bg-gray-800 text-stone-300 w-full rounded-md focus:ring-2 focus:ring-gray-200 transition-all duration-300'
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />{" "}
        </>
      ) : (
        children
      )}
    </motion.div>
  );
}

export default InputField;
