import { createSlice } from "@reduxjs/toolkit";

// final state
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
  userId: "",
  signupUser: {},
  userLanguageTTS: "ar-JO",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      prepare(newUser, token, conversations) {
        return {
          payload: {
            user: newUser,
            token,
            questions: conversations || [],
            // thread_ids: thread_ids || [],
          },
        };
      },
      reducer(state, action) {
        console.log(action.payload);
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem(
          "questions",
          JSON.stringify(action.payload.questions)
        );
        localStorage.setItem("isAuthenticated", true);
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role !== "admin" ? true : false;
        console.log(state.isAdmin);
        state.user = action.payload.user;
        state.userId = action.payload.user.userId;
        state.signupUser = {};
      },
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("questions");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("thread_ids");
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = {};
      state.signupUser = {};
    },
    setSignupUser(state, action) {
      console.log(action.payload);
      state.signupUser = action.payload;
    },
    changeUserLanguageTTS(state, action) {
      state.userLanguageTTS = action.payload;
    },
  },
});

export const { login, logout, setSignupUser, changeUserLanguageTTS } =
  userReducer.actions;
export default userReducer.reducer;
