/**
 * Minimum quantity for a wholesale line. Mirrors the server constant
 * (server/src/shared/constants/wholesale.ts). The server is the authority —
 * it re-validates this at checkout — but the storefront enforces it in the
 * UI so the customer can't add an under-quantity wholesale line.
 */
export const MIN_WHOLESALE_QTY = 20;
