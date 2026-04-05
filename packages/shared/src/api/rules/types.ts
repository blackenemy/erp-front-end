/**
 * Types for pricing rules
 */

export interface Rule {
  $type: string;
  id?: string | number;
  name: string;
  type: string;
  enabled: boolean;
}

export interface WeightTierRule extends Rule {
  tiers: {
    minKg: number;
    maxKg: number;
    pricePerKg: number;
  }[];
}

export interface TimeWindowPromotionRule extends Rule {
  startTime: string;
  endTime: string;
  discountPercent: number;
}

export interface RemoteAreaSurchargeRule extends Rule {
  remoteZipPrefixes: string[];
  surchargeFlat: number;
}

export type RuleInput = Omit<Rule, 'id'>;
export type UpdateRuleInput = Partial<RuleInput>;

// Specific input types for each rule type
export interface WeightTierRuleInput {
  name: string;
  type: 'WeightTier';
  enabled: boolean;
  tiers: {
    minKg: number;
    maxKg: number;
    pricePerKg: number;
  }[];
}

export interface TimeWindowPromotionRuleInput {
  name: string;
  type: 'TimeWindowPromotion';
  enabled: boolean;
  startTime: string;
  endTime: string;
  discountPercent: number;
}

export interface RemoteAreaSurchargeRuleInput {
  name: string;
  type: 'RemoteAreaSurcharge';
  enabled: boolean;
  remoteZipPrefixes: string[];
  surchargeFlat: number;
}
