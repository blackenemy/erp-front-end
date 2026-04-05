export type RuleType = "WeightTier" | "TimeWindowPromotion" | "RemoteAreaSurcharge";

export interface WeightTierRuleData {
  name: string;
  type: "WeightTier";
  is_active: boolean;
  effective_from: string;
  effective_to: string;
  tiers: {
    minKg: number;
    maxKg: number;
    pricePerKg: number;
  }[];
}

export interface TimeWindowPromotionRuleData {
  name: string;
  type: "TimeWindowPromotion";
  is_active: boolean;
  effective_from: string;
  effective_to: string;
  startTime: string;
  endTime: string;
  discountPercent: number;
}

export interface RemoteAreaSurchargeRuleData {
  name: string;
  type: "RemoteAreaSurcharge";
  is_active: boolean;
  effective_from: string;
  effective_to: string;
  remoteZipPrefixes: string[];
  surchargeFlat: number;
}

export type RuleData =
  | WeightTierRuleData
  | TimeWindowPromotionRuleData
  | RemoteAreaSurchargeRuleData;
