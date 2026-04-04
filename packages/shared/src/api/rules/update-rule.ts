import customFetch from "@repo/shared/utils/custom-fetch";

import type { Rule, UpdateRuleInput } from "./types";

/**
 * Updates an existing rule via PUT request.
 * Returns null if rule is not found (404).
 * Only provided fields are updated (partial update).
 * 
 * @param {number | string} id - ID of rule to update
 * @param {UpdateRuleInput} input - Partial data to update
 * @returns {Promise<Rule | null>} The updated rule or null if not found
 * @throws {Error} If request fails (except 404)
 * 
 * @example
 * const updated = await updateRule("1", { enabled: false });
 */
export async function updateRule(id: number | string, input: UpdateRuleInput): Promise<Rule | null> {
  const response = await customFetch(`/rules/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to update rule");
  }

  return response.json();
}
