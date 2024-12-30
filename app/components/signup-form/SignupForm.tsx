'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FormEvent, useState } from "react";
import { createUserAsync, selectServerValidationError, UserModel } from "@/lib/features/signup-form/signupFormSlice";
import { SignupFormSchema } from '../../../lib/definitions';
import { ZodFormattedError } from "zod/lib/ZodError";


export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validationResults, setValidationResults] = useState<ZodFormattedError<UserModel>>();
  const dispatch = useAppDispatch();
  const serverValidationError = useAppSelector(selectServerValidationError);

  function submitUserData(e: FormEvent) {
    e.preventDefault();
    const result = SignupFormSchema.safeParse({email, password, name});
    if (!result.success) {
      setValidationResults(result.error?.format())
    } else {
        dispatch(createUserAsync({
        email,
        password,
        name
      }));
    }
  }

  return (
    <form onSubmit={submitUserData}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {validationResults?.email?._errors &&
          <ul>
            {validationResults.email._errors.map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}
          </ul>
        }
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {validationResults?.password?._errors &&
          <ul>
            {validationResults.password._errors.map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}
          </ul>
        }
      </div>
      <div>
        <label htmlFor="name">Имя</label>
        <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
        {validationResults?.name?._errors &&
          <ul>
            {validationResults.name._errors.map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}
          </ul>
        }
      </div>
      <button type="submit">Зарегистрироваться</button>
      {serverValidationError && <ul>{serverValidationError.split(",").map((errorMessage, index) => <li key={index}>{errorMessage}</li>)}</ul>}
  </form>
  )
}
