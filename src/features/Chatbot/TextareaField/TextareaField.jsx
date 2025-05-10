import { useCallback, useEffect, useRef, useState } from "react";
import RecordIcon from "../../../icons/RecordIcon";
import SubmitIcon from "../../../icons/SubmitIcon";
import { useNavigate, useParams } from "react-router-dom";
import Copyright from "../../../ui/Copyright";
import TextareaInput from "./TextareaInput";
import { useSelector } from "react-redux";
import { useChatActions } from "../../../hooks/useChatActions";
import summarizeText from "../../../services/summarizeText";

let newChatId;
// let currentThreadId;
function TextareaField() {
  const currentId = useSelector((state) => state.chat.currentId);
  const currentThreadId = useSelector((state) => state.chat.current_thread_id);

  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { chatId } = useParams();
  // const currentThreadId = conversations.find(
  //   (conversation) => conversation.id === chatId
  // )?.thread_id;

  console.log(currentThreadId);
  const { createNewChat, sendQuestionHandler, setErrorHandler } =
    useChatActions();
  const [question, setQuestion] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  // const [recognition, setRecognition] = useState(null);
  const questionAreaRef = useRef();
  const blindMode = useSelector((state) => state.user.user.blindMode);
  const userLanguageTTS = useSelector((state) => state.user.userLanguageTTS);
  const isMultiline = question.length > 100;

  const hideRecordIcon = question.trim() !== "";
  // Handle sending the question
  const handleQuestion = useCallback(
    async function (e, directQuestion = null) {
      e?.preventDefault();
      const finalQuestion = directQuestion || question;
      console.log(question);
      if (!finalQuestion.trim()) {
        return;
      }

      if (!chatId) {
        // new chatId only on new chat (for the first question within the chat)
        newChatId = crypto.randomUUID();
        createNewChat(newChatId, summarizeText(finalQuestion));
        // dispatch(createChat(newChatId, finalQuestion));
        // createChat(newChatId, finalQuestion); // new chat
        navigate(`/chatbot/${newChatId}`);
        setQuestion("");
        await sendQuestionHandler(newChatId, finalQuestion, false);
        // await sendQuestionHandler(newChatId, finalQuestion, blindMode);
      } else {
        setQuestion("");
        await sendQuestionHandler(
          currentId,
          finalQuestion,
          false,
          // blindMode,
          currentThreadId
        );
      }
    },
    [
      question,
      sendQuestionHandler,
      navigate,
      chatId,
      createNewChat,
      currentId,
      currentThreadId,
      // blindMode,
    ]
  );

  useEffect(function () {
    questionAreaRef.current.focus();
  }, []);

  // Initialize SpeechRecognition API
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.lang = userLanguageTTS;
      // recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion((prev) => (prev += `${transcript}`));
        // setQuestion((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);

        // submit the form automatically when recording ends
        if (blindMode && transcript.trim())
          handleQuestion(undefined, transcript);
      };

      recognitionInstance.onerror = (event) => {
        // setErrorHandler(`Speech recognition error: ${event.error}`);
        // setIsRecording(false);
        console.log(event.error);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognitionInstance;
    } else {
      // setErrorHandler("Speech Recognition not supported in this browser.");
    }
  }, [setErrorHandler, handleQuestion, blindMode, question, userLanguageTTS]);

  // Handle Start/Stop Recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      // setErrorHandler("Speech Recognition API not available.");
      return;
    }

    if (!isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

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
    <div className='flex flex-col items-center w-full px-5'>
      <div className='relative w-full max-w-[700px]'>
        <form onSubmit={handleQuestion}>
          <TextareaInput
            handleQuestion={handleQuestion}
            question={question}
            questionAreaRef={questionAreaRef}
            isMultiline={isMultiline}
            setQuestion={setQuestion}
          />
        </form>
        {/* Record button: Show when no text is entered */}
        {!hideRecordIcon && (
          <RecordIcon
            toggleRecording={toggleRecording}
            className={isRecording ? "animate-pulse" : ""}
          />
        )}

        {/* Submit button: Show when there is text */}
        {hideRecordIcon && <SubmitIcon handleQuestion={handleQuestion} />}
      </div>

      <Copyright className='py-3' />
    </div>
  );
}

export default TextareaField;
