"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRules, useCreateRule, useUpdateRule, useDeleteRule } from "../api";
import type { Rule } from "../../api/rules/types";
import type {
  WeightTierRule,
  TimeWindowPromotionRule,
  RemoteAreaSurchargeRule,
} from "../../api/rules/types";
import type {
  RuleType,
  WeightTierRuleData,
  TimeWindowPromotionRuleData,
  RemoteAreaSurchargeRuleData,
} from "./types";

export default function useRuleManagement() {
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [ruleType, setRuleType] = useState<RuleType>("WeightTier");
  const [weightTierRule, setWeightTierRule] = useState<WeightTierRuleData>({
    name: "",
    type: "WeightTier",
    is_active: true,
    effective_from: "",
    effective_to: "",
    tiers: [],
  });
  const [timeWindowRule, setTimeWindowRule] =
    useState<TimeWindowPromotionRuleData>({
      name: "",
      type: "TimeWindowPromotion",
      is_active: true,
      effective_from: "",
      effective_to: "",
      startTime: "",
      endTime: "",
      discountPercent: 0,
    });
  const [remoteAreaRule, setRemoteAreaRule] =
    useState<RemoteAreaSurchargeRuleData>({
      name: "",
      type: "RemoteAreaSurcharge",
      is_active: true,
      effective_from: "",
      effective_to: "",
      remoteZipPrefixes: [],
      surchargeFlat: 0,
    });

  const {
    data: rules,
    loading: rulesLoading,
    refetch: refetchRules,
  } = useRules();
  const createRule = useCreateRule();
  const updateRule = useUpdateRule();
  const deleteRuleMutation = useDeleteRule();

  const resetRuleForms = () => {
    setWeightTierRule({
      name: "",
      type: "WeightTier",
      is_active: true,
      effective_from: "",
      effective_to: "",
      tiers: [],
    });
    setTimeWindowRule({
      name: "",
      type: "TimeWindowPromotion",
      is_active: true,
      effective_from: "",
      effective_to: "",
      startTime: "",
      endTime: "",
      discountPercent: 0,
    });
    setRemoteAreaRule({
      name: "",
      type: "RemoteAreaSurcharge",
      is_active: true,
      effective_from: "",
      effective_to: "",
      remoteZipPrefixes: [],
      surchargeFlat: 0,
    });
    setRuleType("WeightTier");
  };

  const getRuleData = () => {
    switch (ruleType) {
      case "WeightTier":
        return { $type: "WeightTier", ...weightTierRule };
      case "TimeWindowPromotion":
        return { $type: "TimeWindowPromotion", ...timeWindowRule };
      case "RemoteAreaSurcharge":
        return { $type: "RemoteAreaSurcharge", ...remoteAreaRule };
      default:
        return { $type: "WeightTier", ...weightTierRule };
    }
  };

  const validateRuleDates = () => {
    const ruleData = getRuleData();

    if (ruleData.effective_from && ruleData.effective_to) {
      if (ruleData.effective_from > ruleData.effective_to) {
        toast.error("วันที่เริ่มต้องน้อยกว่าหรือเท่ากับวันที่สิ้นสุด");
        return false;
      }
    }

    return true;
  };

  const handleCreateRule = async () => {
    const ruleData = getRuleData();
    if (!ruleData.name) {
      toast.error("กรุณากรอกชื่อกฎ");
      return;
    }

    if (!validateRuleDates()) return;

    console.log("Sending payload:", JSON.stringify(ruleData, null, 2));

    try {
      await createRule.mutate(ruleData as any);
      setIsRuleModalOpen(false);
      resetRuleForms();
      refetchRules();
      toast.success("บันทึกกฎสำเร็จ");
    } catch (error) {
      console.error("Failed to create rule:", error);
      toast.error("บันทึกกฎไม่สำเร็จ");
    }
  };

  const handleUpdateRule = async () => {
    if (!selectedRule?.id) return;

    const ruleData = getRuleData();
    if (!ruleData.name) {
      toast.error("กรุณากรอกชื่อกฎ");
      return;
    }

    if (!validateRuleDates()) return;

    console.log("Updating payload:", JSON.stringify(ruleData, null, 2));

    try {
      await updateRule.mutate(selectedRule.id, ruleData as any);
      setIsRuleModalOpen(false);
      resetRuleForms();
      setSelectedRule(null);
      refetchRules();
      toast.success("อัพเดตกฎสำเร็จ");
    } catch (error) {
      console.error("Failed to update rule:", error);
      toast.error("อัพเดตกฎไม่สำเร็จ");
    }
  };

  const handleEditRule = (rule: Rule) => {
    setSelectedRule(rule);

    if (rule.type === "WeightTier") {
      const wtRule = rule as WeightTierRule;
      setWeightTierRule({
        name: wtRule.name,
        type: "WeightTier",
        is_active: wtRule.is_active,
        effective_from: wtRule.effective_from || "",
        effective_to: wtRule.effective_to || "",
        tiers: wtRule.tiers,
      });
      setRuleType("WeightTier");
    } else if (rule.type === "TimeWindowPromotion") {
      const twRule = rule as TimeWindowPromotionRule;
      setTimeWindowRule({
        name: twRule.name,
        type: "TimeWindowPromotion",
        is_active: twRule.is_active,
        effective_from: twRule.effective_from || "",
        effective_to: twRule.effective_to || "",
        startTime: twRule.startTime,
        endTime: twRule.endTime,
        discountPercent: twRule.discountPercent,
      });
      setRuleType("TimeWindowPromotion");
    } else if (rule.type === "RemoteAreaSurcharge") {
      const raRule = rule as RemoteAreaSurchargeRule;
      setRemoteAreaRule({
        name: raRule.name,
        type: "RemoteAreaSurcharge",
        is_active: raRule.is_active,
        effective_from: raRule.effective_from || "",
        effective_to: raRule.effective_to || "",
        remoteZipPrefixes: raRule.remoteZipPrefixes,
        surchargeFlat: raRule.surchargeFlat,
      });
      setRuleType("RemoteAreaSurcharge");
    }

    setIsCreateMode(false);
    setIsRuleModalOpen(true);
  };

  const handleToggleRule = async (id: number | string) => {
    const rule = rules.find((r) => r.id === id);
    if (rule) {
      try {
        await updateRule.mutate(id, { is_active: !rule.is_active });
        refetchRules();
        toast.success(
          rule.is_active ? "ปิดใช้งานกฎสำเร็จ" : "เปิดใช้งานกฎสำเร็จ"
        );
      } catch (error) {
        console.error("Failed to toggle rule:", error);
        toast.error("เปลี่ยนสถานะกฎไม่สำเร็จ");
      }
    }
  };

  const handleDeleteRule = async (id: number | string) => {
    try {
      await deleteRuleMutation.mutate(id);
      refetchRules();
      toast.success("ลบกฎสำเร็จ");
    } catch (error) {
      console.error("Failed to delete rule:", error);
      toast.error("ลบกฎไม่สำเร็จ");
    }
  };

  const openCreateModal = () => {
    setIsCreateMode(true);
    resetRuleForms();
    setIsRuleModalOpen(true);
  };

  const closeModal = () => {
    setIsRuleModalOpen(false);
    setSelectedRule(null);
    resetRuleForms();
  };

  return {
    rules,
    rulesLoading,
    refetchRules,
    isRuleModalOpen,
    isCreateMode,
    selectedRule,
    ruleType,
    weightTierRule,
    timeWindowRule,
    remoteAreaRule,
    setRuleType,
    setWeightTierRule,
    setTimeWindowRule,
    setRemoteAreaRule,
    handleCreateRule,
    handleUpdateRule,
    handleEditRule,
    handleToggleRule,
    handleDeleteRule,
    openCreateModal,
    closeModal,
  };
}
