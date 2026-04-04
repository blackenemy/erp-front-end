import customFetch from "@repo/shared/utils/custom-fetch";

import type { QuoteJob } from "./types";

/**
 * Retrieves job status and results by job ID.
 * Returns null if job is not found (404).
 * 
 * @param {string} jobId - ID of the job to retrieve
 * @returns {Promise<QuoteJob | null>} The job status or null if not found
 * @throws {Error} If request fails (except 404)
 * 
 * @example
 * const job = await getJobStatus("job-123");
 */
export async function getJobStatus(jobId: string): Promise<QuoteJob | null> {
  const response = await customFetch(`/jobs/${jobId}`, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to get job status");
  }

  return response.json();
}
