'use client';
import { useState } from 'react';
import { 
  Button, 
  Card, 
  Table, 
  Layout,
  Badge,
  Modal,
  Input,
  Form,
  FormItem,
  FormWeightTier
} from '@repo/shared';
import { 
  useCalculatePrice, 
  useRules, 
  useCreateRule, 
  useUpdateRule, 
  useDeleteRule 
} from '@repo/shared';
import type { 
  QuoteRequest, 
  QuoteResult, 
  Rule, 
  RuleInput,
  UpdateRuleInput,
  WeightTierRule,
  TimeWindowPromotionRule,
  RemoteAreaSurchargeRule,
  WeightTierRuleInput,
  TimeWindowPromotionRuleInput,
  RemoteAreaSurchargeRuleInput
} from '@repo/shared';

export default function PricingPage() {
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest>({
    weightKg: 0,
    originZip: '',
    destinationZip: ''
  });
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [ruleType, setRuleType] = useState<'WeightTier' | 'TimeWindowPromotion' | 'RemoteAreaSurcharge'>('WeightTier');
  const [weightTierRule, setWeightTierRule] = useState<WeightTierRuleInput>({
    name: '',
    type: 'WeightTier',
    enabled: true,
    tiers: []
  });
  const [timeWindowRule, setTimeWindowRule] = useState<TimeWindowPromotionRuleInput>({
    name: '',
    type: 'TimeWindowPromotion',
    enabled: true,
    startTime: '',
    endTime: '',
    discountPercent: 0
  });
  const [remoteAreaRule, setRemoteAreaRule] = useState<RemoteAreaSurchargeRuleInput>({
    name: '',
    type: 'RemoteAreaSurcharge',
    enabled: true,
    remoteZipPrefixes: [],
    surchargeFlat: 0
  });

  const calculatePrice = useCalculatePrice();
  const { data: rules, loading: rulesLoading, refetch: refetchRules } = useRules();
  const createRule = useCreateRule();
  const updateRule = useUpdateRule();
  const deleteRuleMutation = useDeleteRule();

  const resetRuleForms = () => {
    setWeightTierRule({ name: '', type: 'WeightTier', enabled: true, tiers: [] });
    setTimeWindowRule({ name: '', type: 'TimeWindowPromotion', enabled: true, startTime: '', endTime: '', discountPercent: 0 });
    setRemoteAreaRule({ name: '', type: 'RemoteAreaSurcharge', enabled: true, remoteZipPrefixes: [], surchargeFlat: 0 });
    setRuleType('WeightTier');
  };

  const getRuleData = () => {
    switch (ruleType) {
      case 'WeightTier':
        return { ...weightTierRule, $type: 'WeightTier' };
      case 'TimeWindowPromotion':
        return { ...timeWindowRule, $type: 'TimeWindowPromotion' };
      case 'RemoteAreaSurcharge':
        return { ...remoteAreaRule, $type: 'RemoteAreaSurcharge' };
      default:
        return { ...weightTierRule, $type: 'WeightTier' };
    }
  };

  const handleCalculatePrice = async () => {
    try {
      const result = await calculatePrice.mutate(quoteRequest);
      setQuoteResult(result);
    } catch (error) {
      console.error('Failed to calculate price:', error);
    }
  };

  const handleCreateRule = async () => {
    const ruleData = getRuleData();
    if (!ruleData.name) return;

    try {
      await createRule.mutate(ruleData as any);
      setIsRuleModalOpen(false);
      resetRuleForms();
      refetchRules();
    } catch (error) {
      console.error('Failed to create rule:', error);
    }
  };

  const handleUpdateRule = async () => {
    if (!selectedRule?.id) return;

    const ruleData = getRuleData();
    if (!ruleData.name) return;

    try {
      await updateRule.mutate(selectedRule.id, ruleData as any);
      setIsRuleModalOpen(false);
      resetRuleForms();
      setSelectedRule(null);
      refetchRules();
    } catch (error) {
      console.error('Failed to update rule:', error);
    }
  };

  const handleEditRule = (rule: Rule) => {
    setSelectedRule(rule);

    if (rule.type === 'WeightTier') {
      const wtRule = rule as WeightTierRule;
      setWeightTierRule({
        name: wtRule.name,
        type: 'WeightTier',
        enabled: wtRule.enabled,
        tiers: wtRule.tiers
      });
      setRuleType('WeightTier');
    } else if (rule.type === 'TimeWindowPromotion') {
      const twRule = rule as TimeWindowPromotionRule;
      setTimeWindowRule({
        name: twRule.name,
        type: 'TimeWindowPromotion',
        enabled: twRule.enabled,
        startTime: twRule.startTime,
        endTime: twRule.endTime,
        discountPercent: twRule.discountPercent
      });
      setRuleType('TimeWindowPromotion');
    } else if (rule.type === 'RemoteAreaSurcharge') {
      const raRule = rule as RemoteAreaSurchargeRule;
      setRemoteAreaRule({
        name: raRule.name,
        type: 'RemoteAreaSurcharge',
        enabled: raRule.enabled,
        remoteZipPrefixes: raRule.remoteZipPrefixes,
        surchargeFlat: raRule.surchargeFlat
      });
      setRuleType('RemoteAreaSurcharge');
    }

    setIsCreateMode(false);
    setIsRuleModalOpen(true);
  };

  const handleToggleRule = async (id: number | string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      try {
        await updateRule.mutate(id, { enabled: !rule.enabled });
        refetchRules();
      } catch (error) {
        console.error('Failed to toggle rule:', error);
      }
    }
  };

  const handleDeleteRule = async (id: number | string) => {
    try {
      await deleteRuleMutation.mutate(id);
      refetchRules();
    } catch (error) {
      console.error('Failed to delete rule:', error);
    }
  };

  const ruleColumns = [
    {
      key: 'name' as const,
      title: 'ชื่อกฎ',
      width: '30%',
      align: 'left' as const,
    },
    {
      key: 'type' as const,
      title: 'ประเภท',
      width: '20%',
      align: 'center' as const,
    },
    {
      key: 'enabled' as const,
      title: 'สถานะ',
      width: '20%',
      align: 'center' as const,
      render: (value: boolean, record: Rule) => (
        <span 
          onClick={() => record.id && handleToggleRule(record.id)}
          style={{ cursor: 'pointer', display: 'inline-block' }}
        >
          <Badge variant={value ? 'success' : 'default'}>
            {value ? 'Active' : 'Inactive'}
          </Badge>
        </span>
      ),
    },
    {
      key: 'actions' as const,
      title: 'จัดการ',
      width: '30%',
      align: 'center' as const,
      render: (_: any, record: Rule) => (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handleEditRule(record)}
          >
            แก้ไข
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => record.id && handleDeleteRule(record.id)}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card title="คำนวณราคาขนส่ง">
            <Form layout="vertical">
              <FormItem label="น้ำหนัก (kg)">
                <Input
                  type="number"
                  variant="filled"
                  value={quoteRequest.weightKg || ''}
                  onChange={(e) => setQuoteRequest({ ...quoteRequest, weightKg: Number(e.target.value) })}
                  placeholder="กรอกน้ำหนัก"
                />
              </FormItem>
              <FormItem label="รหัสไปรษณีย์ต้นทาง">
                <Input
                  variant="filled"
                  value={quoteRequest.originZip}
                  onChange={(e) => setQuoteRequest({ ...quoteRequest, originZip: e.target.value })}
                  placeholder="เช่น 10100"
                />
              </FormItem>
              <FormItem label="รหัสไปรษณีย์ปลายทาง">
                <Input
                  variant="filled"
                  value={quoteRequest.destinationZip}
                  onChange={(e) => setQuoteRequest({ ...quoteRequest, destinationZip: e.target.value })}
                  placeholder="เช่น 95120"
                />
              </FormItem>
              <Button variant="primary" onClick={handleCalculatePrice}>
                คำนวณราคา
              </Button>
            </Form>

            {quoteResult && (
              <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <h3>ผลการคำนวณราคา</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>ราคาพื้นฐาน: ฿{quoteResult.basePrice?.toFixed(2) || '0.00'}</div>
                  <div>ส่วนลด: -฿{quoteResult.discount?.toFixed(2) || '0.00'}</div>
                  <div>ค่าบวกพิเศษ: +฿{quoteResult.surcharge?.toFixed(2) || '0.00'}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem' }}>
                    ราคาสุดท้าย: ฿{quoteResult.finalPrice?.toFixed(2) || '0.00'}
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card title="กฎการคิดราคา">
            <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
              <Button variant="primary" onClick={() => { setIsCreateMode(true); resetRuleForms(); setIsRuleModalOpen(true); }}>
                เพิ่มกฎใหม่
              </Button>
            </div>
            <Table
              data={rules || []}
              columns={ruleColumns}
              rowKey="id"
              loading={rulesLoading}
              empty="ไม่พบกฎการคิดราคา"
            />
          </Card>
        </div>
      </Layout.Content>

      <Modal
        title={isCreateMode ? 'เพิ่มกฎใหม่' : `แก้ไขกฎ: ${selectedRule?.name || ''}`}
        isOpen={isRuleModalOpen}
        onClose={() => { setIsRuleModalOpen(false); setSelectedRule(null); resetRuleForms(); }}
      >
        <Form layout="vertical">
          <FormItem label="ชื่อกฎ">
            <Input
              variant="filled"
              value={
                ruleType === 'WeightTier' ? weightTierRule.name :
                ruleType === 'TimeWindowPromotion' ? timeWindowRule.name :
                remoteAreaRule.name
              }
              onChange={(e) => {
                const value = e.target.value;
                switch (ruleType) {
                  case 'WeightTier':
                    setWeightTierRule({ ...weightTierRule, name: value });
                    break;
                  case 'TimeWindowPromotion':
                    setTimeWindowRule({ ...timeWindowRule, name: value });
                    break;
                  case 'RemoteAreaSurcharge':
                    setRemoteAreaRule({ ...remoteAreaRule, name: value });
                    break;
                }
              }}
              placeholder="กรอกชื่อกฎ"
            />
          </FormItem>

          {ruleType === 'WeightTier' && (
            <FormWeightTier
              tiers={weightTierRule.tiers}
              onChange={(newTiers) => setWeightTierRule({ ...weightTierRule, tiers: newTiers })}
              label="ช่วงราคาตามน้ำหนัก (Tiers)"
              style={{ marginBottom: '1rem' }}
            />
          )}

          {ruleType === 'TimeWindowPromotion' && (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <FormItem label="เวลาเริ่ม (HH:mm)">
                <Input
                  variant="filled"
                  type="time"
                  value={timeWindowRule.startTime}
                  onChange={(e) => setTimeWindowRule({ ...timeWindowRule, startTime: e.target.value })}
                  placeholder="09:00"
                />
              </FormItem>
              <FormItem label="เวลาสิ้นสุด (HH:mm)">
                <Input
                  variant="filled"
                  type="time"
                  value={timeWindowRule.endTime}
                  onChange={(e) => setTimeWindowRule({ ...timeWindowRule, endTime: e.target.value })}
                  placeholder="18:00"
                />
              </FormItem>
              <FormItem label="ส่วนลดราคา (%)">
                <Input
                  variant="filled"
                  type="number"
                  value={timeWindowRule.discountPercent}
                  onChange={(e) => setTimeWindowRule({ ...timeWindowRule, discountPercent: Number(e.target.value) })}
                  placeholder="15"
                />
              </FormItem>
            </div>
          )}

          {ruleType === 'RemoteAreaSurcharge' && (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <FormItem label="รหัสไปรษณีย์พื้นที่ห่างไกล (คั่นด้วยลูก)">
                <Input
                  variant="filled"
                  value={remoteAreaRule.remoteZipPrefixes.join(', ')}
                  onChange={(e) => setRemoteAreaRule({ ...remoteAreaRule, remoteZipPrefixes: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                  placeholder="95, 96, 63"
                />
              </FormItem>
              <FormItem label="ค่าบวกเพิ่ม (฿)">
                <Input
                  variant="filled"
                  type="number"
                  value={remoteAreaRule.surchargeFlat}
                  onChange={(e) => setRemoteAreaRule({ ...remoteAreaRule, surchargeFlat: Number(e.target.value) })}
                  placeholder="30"
                />
              </FormItem>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {isCreateMode ? (
              <>
                <Button variant="primary" onClick={handleCreateRule}>บันทึก</Button>
                <Button variant="secondary" onClick={() => { setIsRuleModalOpen(false); resetRuleForms(); }}>ยกเลิก</Button>
              </>
            ) : (
              <>
                <Button variant="primary" onClick={handleUpdateRule}>อัพเดต</Button>
                <Button variant="secondary" onClick={() => { setIsRuleModalOpen(false); resetRuleForms(); setSelectedRule(null); }}>ยกเลิก</Button>
              </>
            )}
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}
