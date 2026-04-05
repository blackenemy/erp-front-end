export interface TimeWindowPromotionFormSectionProps {
  value: {
    startTime: string;
    endTime: string;
    discountPercent: number;
  };
  onChange: (value: {
    startTime: string;
    endTime: string;
    discountPercent: number;
  }) => void;
  style?: React.CSSProperties;
}
