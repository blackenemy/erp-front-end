/**
 * Types for pricing rules
 */

export interface Rule {
  $type: string;
  id?: string | number;
  name: string;
  type: string;
  is_active: boolean;
  effective_from: string | null;
  effective_to: string | null;
}

export interface WeightTierRule extends Rule {
  effective_from: string | null;
  effective_to: string | null;
  tiers: {
    minKg: number;
    maxKg: number;
    pricePerKg: number;
  }[];
}

export interface TimeWindowPromotionRule extends Rule {
  effective_from: string | null;
  effective_to: string | null;
  startTime: string;
  endTime: string;
  discountPercent: number;
}

export interface RemoteAreaSurchargeRule extends Rule {
  effective_from: string | null;
  effective_to: string | null;
  remoteZipPrefixes: string[];
  surchargeFlat: number;
}

export type RuleInput = Omit<Rule, 'id'>;
export type UpdateRuleInput = Partial<RuleInput>;

// Specific input types for each rule type
export interface WeightTierRuleInput {
  $type: 'WeightTier';
  name: string;
  type: 'WeightTier';
  is_active: boolean;
  effective_from: string | null;
  effective_to: string | null;
  tiers: {
    minKg: number;
    maxKg: number;
    pricePerKg: number;
  }[];
}

export interface TimeWindowPromotionRuleInput {
  $type: 'TimeWindowPromotion';
  name: string;
  type: 'TimeWindowPromotion';
  is_active: boolean;
  effective_from: string | null;
  effective_to: string | null;
  startTime: string;
  endTime: string;
  discountPercent: number;
}

export interface RemoteAreaSurchargeRuleInput {
  $type: 'RemoteAreaSurcharge';
  name: string;
  type: 'RemoteAreaSurcharge';
  is_active: boolean;
  effective_from: string | null;
  effective_to: string | null;
  remoteZipPrefixes: string[];
  surchargeFlat: number;
}
