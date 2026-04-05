import { Input, FormItem } from "../../index";
import type {
  TimeWindowPromotionFormSectionProps,
} from "./types";
import {
  TIME_WINDOW_PROMOTION_LABELS,
  TIME_WINDOW_PROMOTION_PLACEHOLDERS,
} from "./constants";
import styles from "./TimeWindowPromotionForm.module.css";

export default function TimeWindowPromotionFormSection({
  value,
  onChange,
  style,
}: TimeWindowPromotionFormSectionProps) {
  return (
    <div className={styles.formSection} style={style}>
      <FormItem label={TIME_WINDOW_PROMOTION_LABELS.START_TIME}>
        <Input
          variant="filled"
          type="time"
          value={value.startTime}
          onChange={(e) =>
            onChange({ ...value, startTime: e.target.value })
          }
          placeholder={TIME_WINDOW_PROMOTION_PLACEHOLDERS.START_TIME}
        />
      </FormItem>
      <FormItem label={TIME_WINDOW_PROMOTION_LABELS.END_TIME}>
        <Input
          variant="filled"
          type="time"
          value={value.endTime}
          onChange={(e) =>
            onChange({ ...value, endTime: e.target.value })
          }
          placeholder={TIME_WINDOW_PROMOTION_PLACEHOLDERS.END_TIME}
        />
      </FormItem>
      <FormItem label={TIME_WINDOW_PROMOTION_LABELS.DISCOUNT_PERCENT}>
        <Input
          variant="filled"
          type="number"
          value={value.discountPercent}
          onChange={(e) =>
            onChange({
              ...value,
              discountPercent: Number(e.target.value),
            })
          }
          placeholder={TIME_WINDOW_PROMOTION_PLACEHOLDERS.DISCOUNT_PERCENT}
        />
      </FormItem>
    </div>
  );
}
