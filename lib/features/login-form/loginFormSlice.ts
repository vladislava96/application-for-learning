import { createAppSlice } from "@/lib/createAppSlice";
import { fetchLogin, fetchLogout } from "./loginAPI";
import { redirect } from "next/navigation";

export interface LoginModel {
  email: string;
  password: string;
}
export interface LoginFormSliceState {
  loginData: LoginModel;
  responseValue: LoginModel;
  status: "idle" | "loading" | "failed" | "";
  serverError: string | undefined,
}

const initialState: LoginFormSliceState = {
  loginData: {
    email: '',
    password: ''
  },
  responseValue: {
    email: '',
    password: ''
  },
  status: "",
  serverError: ""
};

export const LoginFormSlice = createAppSlice({
  name: "loginForm",
  initialState,
  reducers: (create) => ({
    loginAsync: create.asyncThunk(
      async (loginData: LoginModel) => {
        const response = await fetchLogin(loginData);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.responseValue += action.payload;
          redirect("/profile");
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.serverError = action.error.message;
        },
      },
    ),
    logoutAsync: create.asyncThunk(
      async () => {
        const response = await fetchLogout();
        console.log(response);
        return response;
      },
    ),
  }),
  selectors: {
    selectServerError: (signupForm) => signupForm.serverError,
    selectLoginStatus: (signupForm) => signupForm.status
  }
});

export const { loginAsync, logoutAsync } = LoginFormSlice.actions;

export const { selectServerError, selectLoginStatus } = LoginFormSlice.selectors;