import { LoginModel } from "./loginFormSlice";

export const fetchLogin = async (loginData: LoginModel) => {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  const result = await response.json();
  console.log(result);
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.message);
  }
}