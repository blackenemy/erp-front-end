/**
 * Custom fetch wrapper for API calls
 * Handles common patterns like headers, error handling, and base URL
 */

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig() || {};

const PRICING_SERVICE_URL =
  publicRuntimeConfig?.NEXT_PUBLIC_PRICING_SERVICE_URL ||
  process.env.NEXT_PUBLIC_PRICING_SERVICE_URL ||
  "https://api-hubs-quotes.project-hub.it.com";
const RULE_SERVICE_URL =
  publicRuntimeConfig?.NEXT_PUBLIC_RULE_SERVICE_URL ||
  process.env.NEXT_PUBLIC_RULE_SERVICE_URL ||
  "https://api-hubs-rules.project-hub.it.com";

export default async function customFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let baseUrl = "";
  let finalUrl = url;

  // Check if URL is already absolute (starts with http:// or https://)
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    // Determine which service to use based on URL path
    if (url.startsWith("/quotes/") || url.startsWith("/jobs/")) {
      baseUrl = PRICING_SERVICE_URL;
    } else if (url.startsWith("/rules")) {
      baseUrl = RULE_SERVICE_URL;
    }
    finalUrl = `${baseUrl}${url}`;
  }

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(finalUrl, mergedOptions);
  return response;
}
