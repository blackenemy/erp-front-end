import customFetch from "@repo/shared/utils/custom-fetch";

import type { Rule } from "./types";

/**
 * Fetches a single rule by ID from API.
 * Returns null if rule is not found (404).
 * 
 * @param {number | string} id - ID of rule
 * @returns {Promise<Rule | null>} The rule or null if not found
 * @throws {Error} If request fails (except 404)
 * 
 * @example
 * const rule = await getRule("1");
 */
export async function getRule(id: number | string): Promise<Rule | null> {
  const response = await customFetch(`/rules/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch rule");
  }

  return response.json();
}
