import customFetch from "@repo/shared/utils/custom-fetch";

import type { BulkQuoteRequest, BulkQuoteResponse } from "./types";

/**
 * Submits bulk quote requests for async processing.
 * 
 * @param {BulkQuoteRequest} request - Bulk quote request with multiple quote requests
 * @returns {Promise<BulkQuoteResponse>} Job ID for tracking
 * @throws {Error} If request fails
 * 
 * @example
 * const { jobId } = await submitBulkQuotes({ requests: [{ weightKg: 12, originZip: '10100', destinationZip: '95120' }] });
 */
export async function submitBulkQuotes(request: BulkQuoteRequest): Promise<BulkQuoteResponse> {
  const response = await customFetch("/quotes/bulk", {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to submit bulk quotes");
  }

  return response.json();
}
