import { Modal, Input, Form, FormItem, Button, DatePicker } from "../../index";
import FormWeightTier from "../form-weight-tier";
import TimeWindowPromotionForm from "../time-window-promotion-form";
import RemoteAreaSurchargeForm from "../remote-area-surcharge-form";
import type { RuleModalProps } from "./types";
import {
  RULE_MODAL_LABELS,
  RULE_TYPE_OPTIONS,
  RULE_MODAL_PLACEHOLDERS,
} from "./constants";
import styles from "./RuleModal.module.css";

export default function RuleModal({
  isOpen,
  isCreateMode,
  ruleType,
  weightTierRule,
  timeWindowRule,
  remoteAreaRule,
  onRuleTypeChange,
  onWeightTierRuleChange,
  onTimeWindowRuleChange,
  onRemoteAreaRuleChange,
  onSave,
  onCancel,
  selectedRuleName,
}: RuleModalProps) {
  const getRuleName = () => {
    switch (ruleType) {
      case "WeightTier":
        return weightTierRule.name;
      case "TimeWindowPromotion":
        return timeWindowRule.name;
      case "RemoteAreaSurcharge":
        return remoteAreaRule.name;
    }
  };

  const handleNameChange = (value: string) => {
    switch (ruleType) {
      case "WeightTier":
        onWeightTierRuleChange({ ...weightTierRule, name: value });
        break;
      case "TimeWindowPromotion":
        onTimeWindowRuleChange({ ...timeWindowRule, name: value });
        break;
      case "RemoteAreaSurcharge":
        onRemoteAreaRuleChange({ ...remoteAreaRule, name: value });
        break;
    }
  };

  const handleEnabledChange = (enabled: boolean) => {
    switch (ruleType) {
      case "WeightTier":
        onWeightTierRuleChange({ ...weightTierRule, is_active: enabled });
        break;
      case "TimeWindowPromotion":
        onTimeWindowRuleChange({ ...timeWindowRule, is_active: enabled });
        break;
      case "RemoteAreaSurcharge":
        onRemoteAreaRuleChange({ ...remoteAreaRule, is_active: enabled });
        break;
    }
  };

  const getEffectiveFromDate = () => {
    switch (ruleType) {
      case "WeightTier":
        return weightTierRule.effective_from;
      case "TimeWindowPromotion":
        return timeWindowRule.effective_from;
      case "RemoteAreaSurcharge":
        return remoteAreaRule.effective_from;
    }
  };

  const getEffectiveToDate = () => {
    switch (ruleType) {
      case "WeightTier":
        return weightTierRule.effective_to;
      case "TimeWindowPromotion":
        return timeWindowRule.effective_to;
      case "RemoteAreaSurcharge":
        return remoteAreaRule.effective_to;
    }
  };

  const handleEffectiveFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (ruleType) {
      case "WeightTier":
        onWeightTierRuleChange({ ...weightTierRule, effective_from: value });
        break;
      case "TimeWindowPromotion":
        onTimeWindowRuleChange({ ...timeWindowRule, effective_from: value });
        break;
      case "RemoteAreaSurcharge":
        onRemoteAreaRuleChange({ ...remoteAreaRule, effective_from: value });
        break;
    }
  };

  const handleEffectiveToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (ruleType) {
      case "WeightTier":
        onWeightTierRuleChange({ ...weightTierRule, effective_to: value });
        break;
      case "TimeWindowPromotion":
        onTimeWindowRuleChange({ ...timeWindowRule, effective_to: value });
        break;
      case "RemoteAreaSurcharge":
        onRemoteAreaRuleChange({ ...remoteAreaRule, effective_to: value });
        break;
    }
  };

  const getEnabled = () => {
    switch (ruleType) {
      case "WeightTier":
        return weightTierRule.is_active;
      case "TimeWindowPromotion":
        return timeWindowRule.is_active;
      case "RemoteAreaSurcharge":
        return remoteAreaRule.is_active;
    }
  };

  return (
    <Modal
      title={
        isCreateMode
          ? RULE_MODAL_LABELS.CREATE
          : `${RULE_MODAL_LABELS.EDIT}: ${selectedRuleName || ""}`
      }
      isOpen={isOpen}
      onClose={onCancel}
    >
      <Form layout="vertical" className={styles.formContainer}>
        <FormItem label={RULE_MODAL_LABELS.RULE_NAME}>
          <Input
            variant="filled"
            value={getRuleName()}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder={RULE_MODAL_PLACEHOLDERS.RULE_NAME}
          />
        </FormItem>

        {isCreateMode && (
          <FormItem label={RULE_MODAL_LABELS.RULE_TYPE}>
            <select
              value={ruleType}
              onChange={(e) => {
                const value = e.target.value as RuleModalProps["ruleType"];
                onRuleTypeChange(value);
              }}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#f7fafc",
              }}
            >
              <option value={RULE_TYPE_OPTIONS.WEIGHT_TIER.value}>
                {RULE_TYPE_OPTIONS.WEIGHT_TIER.label}
              </option>
              <option value={RULE_TYPE_OPTIONS.TIME_WINDOW_PROMOTION.value}>
                {RULE_TYPE_OPTIONS.TIME_WINDOW_PROMOTION.label}
              </option>
              <option value={RULE_TYPE_OPTIONS.REMOTE_AREA_SURCHARGE.value}>
                {RULE_TYPE_OPTIONS.REMOTE_AREA_SURCHARGE.label}
              </option>
            </select>
          </FormItem>
        )}

        <FormItem label={RULE_MODAL_LABELS.STATUS}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={getEnabled()}
              onChange={(e) => handleEnabledChange(e.target.checked)}
            />
            <span>
              {getEnabled()
                ? RULE_MODAL_LABELS.ENABLED
                : RULE_MODAL_LABELS.DISABLED}
            </span>
          </label>
        </FormItem>

        <FormItem label={RULE_MODAL_LABELS.EFFECTIVE_FROM}>
          <DatePicker
            variant="filled"
            value={getEffectiveFromDate()}
            onChange={handleEffectiveFromChange}
            placeholder={RULE_MODAL_PLACEHOLDERS.EFFECTIVE_FROM}
          />
        </FormItem>

        <FormItem label={RULE_MODAL_LABELS.EFFECTIVE_TO}>
          <DatePicker
            variant="filled"
            value={getEffectiveToDate()}
            onChange={handleEffectiveToChange}
            placeholder={RULE_MODAL_PLACEHOLDERS.EFFECTIVE_TO}
          />
        </FormItem>

        {ruleType === "WeightTier" && (
          <FormWeightTier
            tiers={weightTierRule.tiers}
            onChange={(newTiers) =>
              onWeightTierRuleChange({ ...weightTierRule, tiers: newTiers })
            }
            label="ช่วงราคาตามน้ำหนัก (Tiers)"
            style={{ marginBottom: "1rem" }}
          />
        )}

        {ruleType === "TimeWindowPromotion" && (
          <TimeWindowPromotionForm
            value={{
              startTime: timeWindowRule.startTime,
              endTime: timeWindowRule.endTime,
              discountPercent: timeWindowRule.discountPercent,
            }}
            onChange={(value) =>
              onTimeWindowRuleChange({
                ...timeWindowRule,
                startTime: value.startTime,
                endTime: value.endTime,
                discountPercent: value.discountPercent,
              })
            }
          />
        )}

        {ruleType === "RemoteAreaSurcharge" && (
          <RemoteAreaSurchargeForm
            value={{
              remoteZipPrefixes: remoteAreaRule.remoteZipPrefixes,
              surchargeFlat: remoteAreaRule.surchargeFlat,
            }}
            onChange={(value) =>
              onRemoteAreaRuleChange({
                ...remoteAreaRule,
                remoteZipPrefixes: value.remoteZipPrefixes,
                surchargeFlat: value.surchargeFlat,
              })
            }
          />
        )}

        <div className={styles.actionButtons}>
          {isCreateMode ? (
            <>
              <Button variant="primary" onClick={onSave}>
                {RULE_MODAL_LABELS.SAVE}
              </Button>
              <Button variant="secondary" onClick={onCancel}>
                {RULE_MODAL_LABELS.CANCEL}
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={onSave}>
                {RULE_MODAL_LABELS.UPDATE}
              </Button>
              <Button variant="secondary" onClick={onCancel}>
                {RULE_MODAL_LABELS.CANCEL}
              </Button>
            </>
          )}
        </div>
      </Form>
    </Modal>
  );
}
