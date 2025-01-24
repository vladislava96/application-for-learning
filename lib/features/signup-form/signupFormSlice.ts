import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "./userAPI";

export interface UserModel {
  email: string;
  password: string;
  name: string;
}

export interface SignupFormSliceState {
  userData: UserModel;
  value: UserModel;
  status: "idle" | "loading" | "failed";
  serverValidationError: string | undefined,
}

const initialState: SignupFormSliceState = {
  userData: {
    email: '',
    password: '',
    name: ''
  },
  value: {
    email: '',
    password: '',
    name: ''
  },
  status: "idle",
  serverValidationError: ""
};

export const SignupFormSlice = createAppSlice({
  name: "signupForm",
  initialState,
  reducers: (create) => ({
    createUserAsync: create.asyncThunk(
      async (user: UserModel) => {
        const response = await fetchUser(user);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          console.log(state.status);
          state.value += action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.serverValidationError = action.error.message;
        },
      },
    ),
  }),
  selectors: {
    selectServerValidationError: (signupForm) => signupForm.serverValidationError
  }
});

export const { createUserAsync } = SignupFormSlice.actions;

export const { selectServerValidationError } = SignupFormSlice.selectors;