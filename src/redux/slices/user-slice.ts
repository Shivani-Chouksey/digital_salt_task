import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactFormData } from "../../utils/interfaces/contact-form-interface";

type UserState = {
  users: ContactFormData[]; // Replace `any` with the correct type for the user if known
  loading: boolean;
};

const initialState: UserState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<ContactFormData>) {
      const newUser = { ...action.payload }; // Spread payload to create a new user object
      state.users.push(newUser); // Add the new user to the users array
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
