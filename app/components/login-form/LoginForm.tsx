'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FormEvent, useState } from "react";
import { loginAsync, selectLoginStatus, selectServerError } from "@/lib/features/login-form/loginFormSlice";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const serverValidationError = useAppSelector(selectServerError);
  const loginStatus = useAppSelector(selectLoginStatus);

  function submitUserData(e: FormEvent) {
    e.preventDefault();
    dispatch(loginAsync({
      email,
      password,
    }));
  }

  return (
    <form onSubmit={submitUserData}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button type="submit">Войти</button>
      {serverValidationError && <ul>{serverValidationError.split(",").map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}</ul>}
      {loginStatus === "idle" && <p>Вход выполнен</p>}
  </form>
  )
}