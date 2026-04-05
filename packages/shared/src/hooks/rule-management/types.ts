export type RuleType = "WeightTier" | "TimeWindowPromotion" | "RemoteAreaSurcharge";

export interface WeightTierRuleData {
  name: string;
  type: "WeightTier";
  enabled: boolean;
  tiers: {
    minKg: number;
    maxKg: number;
    pricePerKg: number;
  }[];
}

export interface TimeWindowPromotionRuleData {
  name: string;
  type: "TimeWindowPromotion";
  enabled: boolean;
  startTime: string;
  endTime: string;
  discountPercent: number;
}

export interface RemoteAreaSurchargeRuleData {
  name: string;
  type: "RemoteAreaSurcharge";
  enabled: boolean;
  remoteZipPrefixes: string[];
  surchargeFlat: number;
}

export type RuleData =
  | WeightTierRuleData
  | TimeWindowPromotionRuleData
  | RemoteAreaSurchargeRuleData;
