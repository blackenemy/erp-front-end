"use client";
import {
  Button,
  Card,
  Table,
  Layout,
  Badge,
} from "@repo/shared";
import {
  PriceCalculatorForm,
  RuleModal,
} from "@repo/shared";
import {
  usePriceCalculator,
  useRuleManagement,
} from "@repo/shared";
import type { Rule } from "@repo/shared";

export default function PricingPage() {
  const priceCalculator = usePriceCalculator();
  const ruleManagement = useRuleManagement();

  const ruleColumns = [
    {
      key: "name" as const,
      title: "ชื่อกฎ",
      width: "30%",
      align: "left" as const,
    },
    {
      key: "type" as const,
      title: "ประเภท",
      width: "20%",
      align: "center" as const,
    },
    {
      key: "enabled" as const,
      title: "สถานะ",
      width: "20%",
      align: "center" as const,
      render: (value: boolean, record: Rule) => (
        <span
          onClick={() => record.id && ruleManagement.handleToggleRule(record.id)}
          style={{ cursor: "pointer", display: "inline-block" }}
        >
          <Badge variant={value ? "success" : "default"}>
            {value ? "Active" : "Inactive"}
          </Badge>
        </span>
      ),
    },
    {
      key: "actions" as const,
      title: "จัดการ",
      width: "30%",
      align: "center" as const,
      render: (_: any, record: Rule) => (
        <div
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => ruleManagement.handleEditRule(record)}
          >
            แก้ไข
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => record.id && ruleManagement.handleDeleteRule(record.id)}
          >
            ลบ
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Layout.Header>
        <h1>ระบบคำนวณราคาขนส่ง</h1>
      </Layout.Header>
      <Layout.Content>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Card title="คำนวณราคาขนส่ง">
            <PriceCalculatorForm
              quoteRequest={priceCalculator.quoteRequest}
              onQuoteRequestChange={priceCalculator.setQuoteRequest}
              onCalculate={priceCalculator.handleCalculatePrice}
              quoteResult={priceCalculator.quoteResult}
            />
          </Card>

          <Card title="กฎการคิดราคา">
            <div style={{ marginBottom: "1rem", textAlign: "right" }}>
              <Button variant="primary" onClick={ruleManagement.openCreateModal}>
                เพิ่มกฎใหม่
              </Button>
            </div>
            <Table
              data={ruleManagement.rules || []}
              columns={ruleColumns}
              rowKey="id"
              loading={ruleManagement.rulesLoading}
              empty="ไม่พบกฎการคิดราคา"
            />
          </Card>
        </div>
      </Layout.Content>

      <RuleModal
        isOpen={ruleManagement.isRuleModalOpen}
        isCreateMode={ruleManagement.isCreateMode}
        ruleType={ruleManagement.ruleType}
        weightTierRule={ruleManagement.weightTierRule}
        timeWindowRule={ruleManagement.timeWindowRule}
        remoteAreaRule={ruleManagement.remoteAreaRule}
        onRuleTypeChange={ruleManagement.setRuleType}
        onWeightTierRuleChange={ruleManagement.setWeightTierRule}
        onTimeWindowRuleChange={ruleManagement.setTimeWindowRule}
        onRemoteAreaRuleChange={ruleManagement.setRemoteAreaRule}
        onSave={
          ruleManagement.isCreateMode
            ? ruleManagement.handleCreateRule
            : ruleManagement.handleUpdateRule
        }
        onCancel={ruleManagement.closeModal}
        selectedRuleName={ruleManagement.selectedRule?.name}
      />
    </Layout>
  );
}
