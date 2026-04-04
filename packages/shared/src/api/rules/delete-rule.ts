import customFetch from "@repo/shared/utils/custom-fetch";

/**
 * Deletes a rule via DELETE request.
 * 
 * @param {number | string} id - ID of rule to delete
 * @returns {Promise<boolean>} True if deletion was successful
 * @throws {Error} If request fails
 * 
 * @example
 * const success = await deleteRule("1");
 */
export async function deleteRule(id: number | string): Promise<boolean> {
  const response = await customFetch(`/rules/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete rule");
  }

  return true;
}
