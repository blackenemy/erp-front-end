import customFetch from "@repo/shared/utils/custom-fetch";

import type { QuoteRequest, QuoteResult } from "./types";

/**
 * Calculates shipping price for a single quote request.
 * 
 * @param {QuoteRequest} request - Quote request with weight and zip codes
 * @returns {Promise<QuoteResult>} Calculated quote result
 * @throws {Error} If request fails
 * 
 * @example
 * const result = await calculatePrice({ weightKg: 12, originZip: '10100', destinationZip: '95120' });
 */
export async function calculatePrice(request: QuoteRequest): Promise<QuoteResult> {
  const response = await customFetch("/quotes/price", {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate price");
  }

  return response.json();
}
