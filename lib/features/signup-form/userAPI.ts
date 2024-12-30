import { UserModel } from "./signupFormSlice";

export class ValidationError extends Error {
  result: any
  constructor(result: any, message: string, options?: ErrorOptions) {
    super(message, options)
    this.result = result
  }
}

export const fetchUser = async (user: UserModel) => {

  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new ValidationError(result, result.message)
  }
};