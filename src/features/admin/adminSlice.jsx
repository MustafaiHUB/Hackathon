import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAdmin: false,
  isLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAdmin, setLoading } = adminSlice.actions;
export default adminSlice.reducer;
