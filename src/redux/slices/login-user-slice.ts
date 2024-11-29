import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  gender: string;
  image: string;
};

type UserState = {
  loginUser: UserType | null; // Allow null for initial state
  success: boolean;
};

const initialState: UserState = {
  loginUser: null, // Set to null initially
  success: false,  // Set to false initially
};

// Modify the reducer to accept both user data and success status in one object
const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    addLoginUser(state, action: PayloadAction<{ userData: UserType; success: boolean }>) {
      const { userData, success } = action.payload;
      state.loginUser = userData; // Set the user data
      state.success = success;     // Set the success status
    },
  },
});

export const { addLoginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;
