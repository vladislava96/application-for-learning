import type { Metadata } from "next";
import { LoginForm } from "../components/login-form/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1>Главная страница</h1>
      <LoginForm/>
    </>
  );
}

const metadata: Metadata = {
  title: "Вход"
}