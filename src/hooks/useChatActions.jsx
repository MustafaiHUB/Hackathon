import {
  createChat,
  updateCurrentId,
  sendQuestion,
  deleteAllChats,
  deleteChat,
  setLoading,
  setError,
  clearError,
  setLatestQuestion,
  setQuestions,
  setConversationMessages,
  addConversation,
  updateCurrentThreadId,
  // setThreadsIds,
} from "../features/Chatbot/Chat/chatSlice";
import {
  deleteAllConversation,
  deleteConversation,
  getAnswer,
} from "../services/apiChatbot";
import { replace, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSidebar } from "../context/SidebarContext";
import { useCallback } from "react";

export const useChatActions = () => {
  // const currentThreadId = useSelector((state) => state.chat.current_thread_id);

  const { handleCloseSettings, closeSidebar } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addConversationHandler = useCallback(
    (converation) => {
      dispatch(addConversation(converation));
    },
    [dispatch]
  );

  const createNewChat = (chatId, question) => {
    dispatch(createChat(chatId, question));
  };

  const deleteAllChatsHandler = async (userId) => {
    await deleteAllConversation(userId);
    dispatch(deleteAllChats());
    closeSidebar();
    handleCloseSettings();
    navigate("/chatbot/new", replace);
  };

  const deleteChatHandler = async (chatId) => {
    console.log(chatId);
    await deleteConversation(chatId);

    dispatch(deleteChat(chatId));
    navigate("/chatbot/new", replace);
  };

  const updateCurrentIdHandler = (chatId) => {
    dispatch(updateCurrentId(chatId));
  };

  const updateCurrentThreadIdHandler = useCallback(
    (thread_id) => {
      console.log(thread_id);
      dispatch(updateCurrentThreadId(thread_id));
    },
    [dispatch]
  );

  const sendQuestionHandler = async (
    chatId,
    question,
    currentThreadId = null
  ) => {
    try {
      dispatch(setLoading());
      dispatch(setLatestQuestion(question));
      console.log(chatId);
      const answer = await getAnswer(chatId, question, currentThreadId);
      console.log(answer);
      dispatch(
        sendQuestion(
          question,
          answer.answer,
          answer.response_id,
          answer.thread_id
        )
      );
    } catch (err) {
      dispatch(sendQuestion(question, "Failed to get the answer! Try again"));
      console.log(err.message);
    }
  };

  const setQuestionsHandler = useCallback(
    (questions) => {
      if (questions) {
        console.log(questions);
        dispatch(setQuestions(questions || []));
      }
    },
    [dispatch]
  );

  const setConversationMessagesHandler = (messages) => {
    dispatch(setConversationMessages(messages));
  };

  const setErrorHandler = (error) => {
    dispatch(setError(error));
  };

  const clearErrorHandler = () => {
    dispatch(clearError());
  };

  return {
    createNewChat,
    deleteAllChatsHandler,
    deleteChatHandler,
    updateCurrentIdHandler,
    sendQuestionHandler,
    setQuestionsHandler,
    setConversationMessagesHandler,
    setErrorHandler,
    clearErrorHandler,
    addConversationHandler,
    updateCurrentThreadIdHandler,
  };
};
