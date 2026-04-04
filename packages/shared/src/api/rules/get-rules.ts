import customFetch from "@repo/shared/utils/custom-fetch";

import type { Rule } from "./types";

/**
 * Fetches a list of all rules from API.
 * 
 * @returns {Promise<Rule[]>} Array of rules
 * @throws {Error} If request fails
 * 
 * @example
 * const rules = await getRules();
 */
export async function getRules(): Promise<Rule[]> {
  const response = await customFetch("/rules", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch rules");
  }

  return response.json();
}
