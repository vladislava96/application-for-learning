import { redirect } from "next/navigation";
import { LoginModel } from "./loginFormSlice";

export const fetchLogin = async (loginData: LoginModel) => {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.message);
  }
}

export const fetchLogout = async () => {
  const response = await fetch("http://localhost:3000/api/logout");
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.message);
  }
}