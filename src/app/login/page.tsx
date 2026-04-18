import { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Martinonoir account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
