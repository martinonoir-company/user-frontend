import { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Martinonoir account for exclusive access.",
};

export default function RegisterPage() {
  // Suspense boundary required because RegisterForm uses useSearchParams.
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
