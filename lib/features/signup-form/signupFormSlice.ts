import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, ValidationError } from "./userAPI";

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
        console.log('in thunk')
        console.log(response)
        return response;
      },
      {
        pending: (state) => {
          console.log("loading")
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          console.log("idle")
          state.status = "idle";
          state.value += action.payload;
        },
        rejected: (state, action) => {
          console.log("failed2", action.error.message)
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