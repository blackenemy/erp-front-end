import {
  Input,
  Button,
  Form,
  FormItem,
  Combobox,
  THAI_POSTAL_CODES,
} from "../../index";
import type { PriceCalculatorFormProps } from "./types";
import {
  PRICE_CALCULATOR_FORM_LABELS,
  PRICE_RESULT_LABELS,
  PLACEHOLDERS,
} from "./constants";
import { formatPrice } from "./helpers";
import styles from "./PriceCalculatorForm.module.css";

function SingleSelectCombobox({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  const handleChange = (selected: string[]) => {
    if (selected.length === 0) {
      onChange("");
      return;
    }
    
    const lastSelected = selected[selected.length - 1];
    onChange(lastSelected);
  };

  return (
    <Combobox
      value={value ? [value] : []}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      maxVisibleItems={10}
      maxTags={1}
    />
  );
}

export default function PriceCalculatorForm({
  quoteRequest,
  onQuoteRequestChange,
  onCalculate,
  quoteResult,
}: PriceCalculatorFormProps) {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuoteRequestChange({
      ...quoteRequest,
      weightKg: Number(e.target.value),
    });
  };

  const handleOriginZipChange = (value: string) => {
    onQuoteRequestChange({
      ...quoteRequest,
      originZip: value,
    });
  };

  const handleDestinationZipChange = (value: string) => {
    onQuoteRequestChange({
      ...quoteRequest,
      destinationZip: value,
    });
  };

  const isFormValid =
    quoteRequest.weightKg > 0 &&
    quoteRequest.originZip !== "" &&
    quoteRequest.destinationZip !== "";

  return (
    <>
      <Form layout="vertical">
        <FormItem label={PRICE_CALCULATOR_FORM_LABELS.WEIGHT}>
          <Input
            type="number"
            variant="filled"
            value={quoteRequest.weightKg || ""}
            onChange={handleWeightChange}
            placeholder={PLACEHOLDERS.WEIGHT}
          />
        </FormItem>
        <FormItem label={PRICE_CALCULATOR_FORM_LABELS.ORIGIN_ZIP}>
          <SingleSelectCombobox
            value={quoteRequest.originZip}
            onChange={handleOriginZipChange}
            options={THAI_POSTAL_CODES}
            placeholder={PLACEHOLDERS.ORIGIN_ZIP}
          />
        </FormItem>
        <FormItem label={PRICE_CALCULATOR_FORM_LABELS.DESTINATION_ZIP}>
          <SingleSelectCombobox
            value={quoteRequest.destinationZip}
            onChange={handleDestinationZipChange}
            options={THAI_POSTAL_CODES}
            placeholder={PLACEHOLDERS.DESTINATION_ZIP}
          />
        </FormItem>
        <Button variant="primary" onClick={onCalculate} disabled={!isFormValid}>
          {PRICE_CALCULATOR_FORM_LABELS.CALCULATE}
        </Button>
      </Form>

      {quoteResult && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>{PRICE_RESULT_LABELS.TITLE}</h3>
          <div className={styles.resultDetails}>
            <div>
              {PRICE_RESULT_LABELS.BASE_PRICE}: ฿{" "}
              {formatPrice(quoteResult.basePrice)}
            </div>
            <div>
              {PRICE_RESULT_LABELS.DISCOUNT}: - ฿{" "}
              {formatPrice(quoteResult.discount)}
            </div>
            <div>
              {PRICE_RESULT_LABELS.SURCHARGE}: + ฿{" "}
              {formatPrice(quoteResult.surcharge)}
            </div>
            <div className={styles.finalPrice}>
              {PRICE_RESULT_LABELS.FINAL_PRICE}: ฿{" "}
              {formatPrice(quoteResult.finalPrice)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
