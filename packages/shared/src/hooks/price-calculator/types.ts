export interface QuoteRequest {
  weightKg: number;
  originZip: string;
  destinationZip: string;
}

export interface QuoteResult {
  basePrice?: number;
  discount?: number;
  surcharge?: number;
  finalPrice?: number;
}
