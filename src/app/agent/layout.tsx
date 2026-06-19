import type { ReactNode } from "react";
import { AgentAuthProvider } from "@/lib/agent-auth-context";

/**
 * Layout for the marketing-agent surface. Wraps the children in the
 * agent auth provider — kept entirely separate from the customer auth
 * provider so the two sessions don't tread on each other.
 *
 * No Header / Footer here intentionally: the agent surface is a dashboard,
 * not a shopping area, and we want it to feel distinct from the storefront.
 */
export default function AgentLayout({ children }: { children: ReactNode }) {
  return <AgentAuthProvider>{children}</AgentAuthProvider>;
}
