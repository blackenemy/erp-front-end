"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useCalculatePrice } from "../api";
import type { QuoteRequest, QuoteResult } from "./types";

export default function usePriceCalculator() {
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>({
    weightKg: 0,
    originZip: "",
    destinationZip: "",
  });
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const calculatePrice = useCalculatePrice();

  const handleCalculatePrice = async () => {
    try {
      const result = await calculatePrice.mutate(quoteRequest);
      setQuoteResult(result);
      toast.success("คำนวณราคาสำเร็จ");
    } catch (error) {
      console.error("Failed to calculate price:", error);
      toast.error("คำนวณราคาไม่สำเร็จ");
    }
  };

  return {
    quoteRequest,
    setQuoteRequest,
    quoteResult,
    handleCalculatePrice,
    loading: calculatePrice.loading,
  };
}
