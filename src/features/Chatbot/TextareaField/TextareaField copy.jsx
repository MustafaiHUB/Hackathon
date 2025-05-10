import { useCallback, useEffect, useState } from "react";
import RecordIcon from "../../../icons/RecordIcon";
import SubmitIcon from "../../../icons/SubmitIcon";
import { useQuestion } from "../../../context/QuestionContext";
import { useNavigate, useParams } from "react-router-dom";

function TextareaField() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [question, setQuestion] = useState("");
  const [hideRecord, setHideRecord] = useState(false);
  const { sendQuestion, createChat, sidebarQuestion } = useQuestion();

  const isMultiline = question.length > 100;

  const handleQuestion = useCallback(
    async function (e) {
      e.preventDefault();

      if (!question.trim()) {
        return;
      }

      // let newChatId = chatId;
      if (!chatId) {
        const newChatId = Math.floor(
          Math.random() * 1000000 * (Math.random() * 1000)
        );
        createChat(newChatId);
        sidebarQuestion(question);
        navigate(`/chatbot/${newChatId}`);
      }

      sendQuestion(question);
      setQuestion("");
    },
    [question, sendQuestion, navigate, chatId, createChat, sidebarQuestion]
  );

  useEffect(() => {
    setHideRecord(question.trim() !== "");
  }, [question]);

  useEffect(
    function () {
      const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
          return;
        }
        if (e.key === "Enter") {
          handleQuestion(e);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [handleQuestion]
  );

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='relative w-full max-w-[700px]'>
        <form onSubmit={handleQuestion}>
          <div className=''>
            <textarea
              // placeholder='Ask Your Engineering Question'
              placeholder='Ask a question'
              name='question'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`w-full  p-4 pr-12 text-stone-200 ${
                isMultiline ? "rounded-lg" : "rounded-full"
              } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#282a2c] resize-none textarea`}
            />
          </div>
        </form>

        {!hideRecord && <RecordIcon />}

        {hideRecord && <SubmitIcon />}
      </div>
      <p className='text-stone-200 py-3 text-xs'>
        Copyright &copy; 2025 CPE | Graduation Project
      </p>
    </div>
  );
}

export default TextareaField;
