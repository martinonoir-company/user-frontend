import { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Martinonoir account for exclusive access.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
