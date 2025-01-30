'use client'
import { logoutAsync } from "@/lib/features/login-form/loginFormSlice";
import { useAppDispatch } from "@/lib/hooks";
import { redirect } from "next/navigation";


export const Menu = () => {
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(logoutAsync());
    redirect("/login")
  }

  return (
    <button onClick={logout}>Выход</button>
  )
}