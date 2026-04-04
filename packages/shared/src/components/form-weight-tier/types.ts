import type { HTMLAttributes } from "react";

export interface WeightTier {
  minKg: number;
  maxKg: number;
  pricePerKg: number;
}

export interface FormWeightTierProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tiers: WeightTier[];
  onChange: (tiers: WeightTier[]) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}
