import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../../utils/types/user-detail-type";

type UserState = {
  users: UserType[]; // Replace `any` with the correct type for the user if known
  loading: boolean;
  token:string;
};

const initialState: UserState = {
  users: [],
  loading: false,
  token:"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserType>) {
      const newUser = { ...action.payload }; // Spread payload to create a new user object
      state.users.push(newUser); // Add the new user to the users array
    },
    addToken:(state,action: PayloadAction<string>)=>{
      state.token=action.payload
    }
  },
});

export const { addUser,addToken } = userSlice.actions;
export default userSlice.reducer;
