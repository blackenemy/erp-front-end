/**
 * Types for pricing quotes
 */

export interface QuoteRequest {
  weightKg: number;
  originZip: string;
  destinationZip: string;
}

export interface QuoteResult {
  basePrice: number;
  discount: number;
  surcharge: number;
  finalPrice: number;
}

export interface BulkQuoteRequest {
  requests: QuoteRequest[];
}

export interface BulkQuoteResponse {
  jobId: string;
}

export interface QuoteJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  results?: QuoteResult[];
  error?: string;
}
