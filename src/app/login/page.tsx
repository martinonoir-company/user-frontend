import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Martinonoir account.",
};

export default function LoginPage() {
  // Suspense boundary required because LoginForm uses useSearchParams.
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
