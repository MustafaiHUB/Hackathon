import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authentication/userSlice";
import chatReducer from "./features/Chatbot/Chat/chatSlice";
import adminReducer from "./features/admin/adminSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    admin: adminReducer,
  },
});

export default store;
