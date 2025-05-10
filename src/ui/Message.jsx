import { motion } from "framer-motion";
import { useEffect } from "react";
// import { useQuestion } from "../context/QuestionContext";
import { useChatActions } from "../hooks/useChatActions";
function Message({ message }) {
  // const { clearError } = useQuestion();
  const { clearErrorHandler } = useChatActions();
  useEffect(
    function () {
      const timeoutId = setTimeout(() => {
        clearErrorHandler();
      }, 5000);

      return () => clearTimeout(timeoutId);
    },
    [clearErrorHandler]
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='absolute left-1/2 -translate-x-1/2  text-center bg-red-700 px-5 py-2.5 z-50 mt-2 rounded-md text-stone-300 text-xm font-semibold space-x-2'
    >
      <span>!</span>
      <span>{message}</span>
    </motion.div>
  );
}

export default Message;
