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

export interface PriceCalculatorFormProps {
  quoteRequest: QuoteRequest;
  onQuoteRequestChange: (request: QuoteRequest) => void;
  onCalculate: () => void;
  quoteResult: QuoteResult | null;
}
