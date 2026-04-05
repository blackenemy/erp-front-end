import customFetch from "@repo/shared/utils/custom-fetch";

import type { Rule, RuleInput } from "./types";

/**
 * Creates a new rule via POST request.
 * 
 * @param {RuleInput} input - Data for new rule
 * @returns {Promise<Rule>} The created rule (with id)
 * @throws {Error} If request fails
 * 
 * @example
 * const newRule = await createRule({ name: "Standard", type: "WeightTier", enabled: true });
 */
export async function createRule(input: RuleInput): Promise<Rule> {
  const response = await customFetch("/rules", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create rule");
  }

  return response.json();
}
