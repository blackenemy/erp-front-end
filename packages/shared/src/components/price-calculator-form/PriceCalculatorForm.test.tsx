import { render, screen } from "@testing-library/react";
import PriceCalculatorForm from "./PriceCalculatorForm";
import type { QuoteRequest, QuoteResult } from "./types";

describe("PriceCalculatorForm", () => {
  const mockQuoteRequest: QuoteRequest = {
    weightKg: 10,
    originZip: "10100",
    destinationZip: "10200",
  };

  const mockQuoteResult: QuoteResult = {
    basePrice: 100,
    discount: 10,
    surcharge: 5,
    finalPrice: 95,
  };

  it("renders form fields correctly", () => {
    render(
      <PriceCalculatorForm
        quoteRequest={mockQuoteRequest}
        onQuoteRequestChange={jest.fn()}
        onCalculate={jest.fn()}
        quoteResult={null}
      />
    );

    expect(screen.getByText("น้ำหนัก (kg)")).toBeInTheDocument();
    expect(screen.getByText("รหัสไปรษณีย์ต้นทาง")).toBeInTheDocument();
    expect(screen.getByText("รหัสไปรษณีย์ปลายทาง")).toBeInTheDocument();
    expect(screen.getByText("คำนวณราคา")).toBeInTheDocument();
  });

  it("displays quote result when provided", () => {
    render(
      <PriceCalculatorForm
        quoteRequest={mockQuoteRequest}
        onQuoteRequestChange={jest.fn()}
        onCalculate={jest.fn()}
        quoteResult={mockQuoteResult}
      />
    );

    expect(screen.getByText("ผลการคำนวณราคา")).toBeInTheDocument();
    expect(screen.getByText(/ราคาพื้นฐาน: ฿ 100\.00/)).toBeInTheDocument();
    expect(screen.getByText(/ส่วนลด: - ฿ 10\.00/)).toBeInTheDocument();
    expect(screen.getByText(/ค่าบวกพิเศษ: \+ ฿ 5\.00/)).toBeInTheDocument();
    expect(screen.getByText(/ราคาสุดท้าย: ฿ 95\.00/)).toBeInTheDocument();
  });

  it("does not display quote result when null", () => {
    render(
      <PriceCalculatorForm
        quoteRequest={mockQuoteRequest}
        onQuoteRequestChange={jest.fn()}
        onCalculate={jest.fn()}
        quoteResult={null}
      />
    );

    expect(screen.queryByText("ผลการคำนวณราคา")).not.toBeInTheDocument();
  });

  it("calls onCalculate when button is clicked", () => {
    const mockOnCalculate = jest.fn();
    render(
      <PriceCalculatorForm
        quoteRequest={mockQuoteRequest}
        onQuoteRequestChange={jest.fn()}
        onCalculate={mockOnCalculate}
        quoteResult={null}
      />
    );

    screen.getByText("คำนวณราคา").click();
    expect(mockOnCalculate).toHaveBeenCalledTimes(1);
  });
});
