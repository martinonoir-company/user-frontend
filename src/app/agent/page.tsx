"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/lib/agent-auth-context";

/**
 * Agent landing page — redirects to dashboard if logged in, else login.
 */
export default function AgentRoot() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAgentAuth();

  useEffect(() => {
    if (isLoading) return;
    router.replace(isAuthenticated ? "/agent/dashboard" : "/agent/login");
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50">
      <div className="text-sm text-ink-500">Loading…</div>
    </div>
  );
}
