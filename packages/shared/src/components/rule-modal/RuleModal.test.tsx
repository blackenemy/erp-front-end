import { render, screen, fireEvent } from '@testing-library/react';
import RuleModal from './RuleModal';
import type { RuleModalProps } from './types';

describe('RuleModal', () => {
  const defaultProps: RuleModalProps = {
    isOpen: false,
    isCreateMode: true,
    ruleType: 'WeightTier',
    weightTierRule: {
      name: 'Test Rule',
      type: 'WeightTier',
      enabled: true,
      tiers: [{ minKg: 0, maxKg: 10, pricePerKg: 100 }],
    },
    timeWindowRule: {
      name: 'Test Rule',
      type: 'TimeWindowPromotion',
      enabled: true,
      startTime: '09:00',
      endTime: '18:00',
      discountPercent: 15,
    },
    remoteAreaRule: {
      name: 'Test Rule',
      type: 'RemoteAreaSurcharge',
      enabled: true,
      remoteZipPrefixes: ['95', '96'],
      surchargeFlat: 30,
    },
    onRuleTypeChange: jest.fn(),
    onWeightTierRuleChange: jest.fn(),
    onTimeWindowRuleChange: jest.fn(),
    onRemoteAreaRuleChange: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
  };

  it('does not render when isOpen is false', () => {
    render(<RuleModal {...defaultProps} />);
    expect(screen.queryByText('เพิ่มกฎใหม่')).not.toBeInTheDocument();
  });

  it('renders in create mode when isCreateMode is true', () => {
    render(<RuleModal {...defaultProps} isOpen />);
    expect(screen.getByText('เพิ่มกฎใหม่')).toBeInTheDocument();
    expect(screen.getByText('ประเภทกฎ')).toBeInTheDocument();
  });

  it('renders in edit mode when isCreateMode is false', () => {
    render(
      <RuleModal {...defaultProps} isOpen isCreateMode={false} selectedRuleName="Test Rule" />
    );
    expect(screen.getByText('แก้ไขกฎ: Test Rule')).toBeInTheDocument();
    expect(screen.queryByText('ประเภทกฎ')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<RuleModal {...defaultProps} isOpen />);
    fireEvent.click(screen.getByText('ยกเลิก'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSave when save button is clicked', () => {
    render(<RuleModal {...defaultProps} isOpen />);
    fireEvent.click(screen.getByText('บันทึก'));
    expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
  });

  it('displays WeightTier form when ruleType is WeightTier', () => {
    render(<RuleModal {...defaultProps} isOpen />);
    expect(screen.getByText('ช่วงราคาตามน้ำหนัก (Tiers)')).toBeInTheDocument();
  });

  it('displays TimeWindowPromotion form when ruleType is TimeWindowPromotion', () => {
    render(<RuleModal {...defaultProps} isOpen ruleType="TimeWindowPromotion" />);
    expect(screen.getByText('เวลาเริ่ม (HH:mm)')).toBeInTheDocument();
    expect(screen.getByText('เวลาสิ้นสุด (HH:mm)')).toBeInTheDocument();
    expect(screen.getByText('ส่วนลดราคา (%)')).toBeInTheDocument();
  });

  it('displays RemoteAreaSurcharge form when ruleType is RemoteAreaSurcharge', () => {
    render(<RuleModal {...defaultProps} isOpen ruleType="RemoteAreaSurcharge" />);
    expect(
      screen.getByText('รหัสไปรษณีย์พื้นที่ห่างไกล')
    ).toBeInTheDocument();
    expect(screen.getByText('ค่าบวกเพิ่ม (฿)')).toBeInTheDocument();
  });

  it('calls onRuleTypeChange when rule type is changed', () => {
    render(<RuleModal {...defaultProps} isOpen />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'TimeWindowPromotion' } });
    expect(defaultProps.onRuleTypeChange).toHaveBeenCalledWith('TimeWindowPromotion');
  });
});
