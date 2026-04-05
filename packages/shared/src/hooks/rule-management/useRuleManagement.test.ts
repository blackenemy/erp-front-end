import { renderHook, act } from '@testing-library/react';
import useRuleManagement from './use-rule-management';

jest.mock('@repo/shared/hooks/api');
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../api', () => ({
  calculatePrice: jest.fn().mockReturnValue({
    mutate: jest.fn().mockResolvedValue({ total: 500 }),
  }),
}));

const { toast } = require('sonner');
const mockHooks = require('@repo/shared/hooks/api');

describe('useRuleManagement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHooks.useRules.mockReturnValue({
      data: [
        { id: 1, name: 'Rule 1', type: 'WeightTier', enabled: true, tiers: [] },
        { id: 2, name: 'Rule 2', type: 'TimeWindowPromotion', enabled: false, startTime: '09:00', endTime: '17:00', discountPercent: 10 },
      ],
      loading: false,
      refetch: jest.fn(),
    });
    mockHooks.useCreateRule.mockReturnValue({
      mutate: jest.fn().mockResolvedValue({ id: 1, name: 'New Rule', type: 'WeightTier', enabled: true, tiers: [] }),
    });
    mockHooks.useUpdateRule.mockReturnValue({
      mutate: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Rule', type: 'WeightTier', enabled: false, tiers: [] }),
    });
    mockHooks.useDeleteRule.mockReturnValue({
      mutate: jest.fn().mockResolvedValue(true),
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useRuleManagement());

    expect(result.current.isRuleModalOpen).toBe(false);
    expect(result.current.isCreateMode).toBe(false);
    expect(result.current.selectedRule).toBe(null);
    expect(result.current.ruleType).toBe('WeightTier');
    expect(result.current.weightTierRule).toEqual({
      name: '',
      type: 'WeightTier',
      enabled: true,
      tiers: [],
    });
    expect(result.current.timeWindowRule).toEqual({
      name: '',
      type: 'TimeWindowPromotion',
      enabled: true,
      startTime: '',
      endTime: '',
      discountPercent: 0,
    });
    expect(result.current.remoteAreaRule).toEqual({
      name: '',
      type: 'RemoteAreaSurcharge',
      enabled: true,
      remoteZipPrefixes: [],
      surchargeFlat: 0,
    });
  });

  it('fetches rules on mount', () => {
    renderHook(() => useRuleManagement());
    expect(mockHooks.useRules).toHaveBeenCalled();
  });

  it('opens create modal when openCreateModal is called', () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.openCreateModal();
    });
    
    expect(result.current.isRuleModalOpen).toBe(true);
    expect(result.current.isCreateMode).toBe(true);
    expect(result.current.selectedRule).toBe(null);
  });

  it('closes modal when closeModal is called', () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.openCreateModal();
    });
    expect(result.current.isRuleModalOpen).toBe(true);
    
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isRuleModalOpen).toBe(false);
  });

  it('sets rule type when setRuleType is called', () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.setRuleType('TimeWindowPromotion');
    });
    
    expect(result.current.ruleType).toBe('TimeWindowPromotion');
  });

  it('updates weight tier rule when setWeightTierRule is called', () => {
    const { result } = renderHook(() => useRuleManagement());
    const newRule = { name: 'Test', type: 'WeightTier' as const, enabled: true, tiers: [{ minKg: 0, maxKg: 10, pricePerKg: 50 }] };
    
    act(() => {
      result.current.setWeightTierRule(newRule);
    });
    
    expect(result.current.weightTierRule).toEqual(newRule);
  });

  it('creates rule when handleCreateRule is called', async () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.setWeightTierRule({ name: 'New Rule', type: 'WeightTier', enabled: true, tiers: [] });
    });
    
    await act(async () => {
      await result.current.handleCreateRule();
    });
    
    expect(mockHooks.useCreateRule().mutate).toHaveBeenCalled();
    expect(result.current.isRuleModalOpen).toBe(false);
    expect(toast.success).toHaveBeenCalledWith('บันทึกกฎสำเร็จ');
  });

  it('shows error when trying to create rule without name', async () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.setWeightTierRule({ name: '', type: 'WeightTier', enabled: true, tiers: [] });
    });
    
    await act(async () => {
      await result.current.handleCreateRule();
    });
    
    expect(toast.error).toHaveBeenCalledWith('กรุณากรอกชื่อกฎ');
    expect(mockHooks.useCreateRule().mutate).not.toHaveBeenCalled();
  });

  it('updates rule when handleUpdateRule is called', async () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.handleEditRule({ $type: 'WeightTier', id: 1, name: 'Rule 1', type: 'WeightTier', enabled: true, tiers: [] });
      result.current.setWeightTierRule({ name: 'Updated Rule', type: 'WeightTier', enabled: false, tiers: [] });
    });
    
    await act(async () => {
      await result.current.handleUpdateRule();
    });
    
    expect(mockHooks.useUpdateRule().mutate).toHaveBeenCalled();
    expect(result.current.isRuleModalOpen).toBe(false);
    expect(result.current.selectedRule).toBe(null);
    expect(toast.success).toHaveBeenCalledWith('อัพเดตกฎสำเร็จ');
  });

  it('shows error when trying to update rule without name', async () => {
    const { result } = renderHook(() => useRuleManagement());
    
    act(() => {
      result.current.handleEditRule({ $type: 'WeightTier', id: 1, name: 'Rule 1', type: 'WeightTier', enabled: true, tiers: [] });
      result.current.setWeightTierRule({ name: '', type: 'WeightTier', enabled: false, tiers: [] });
    });
    
    await act(async () => {
      await result.current.handleUpdateRule();
    });
    
    expect(toast.error).toHaveBeenCalledWith('กรุณากรอกชื่อกฎ');
    expect(mockHooks.useUpdateRule().mutate).not.toHaveBeenCalled();
  });

  it('edits rule when handleEditRule is called', () => {
    const { result } = renderHook(() => useRuleManagement());
    const rule = { $type: 'TimeWindowPromotion', id: 1, name: 'Rule 1', type: 'TimeWindowPromotion', enabled: true, startTime: '09:00', endTime: '17:00', discountPercent: 10 };
    
    act(() => {
      result.current.handleEditRule(rule);
    });
    
    expect(result.current.selectedRule).toEqual(rule);
    expect(result.current.isCreateMode).toBe(false);
    expect(result.current.isRuleModalOpen).toBe(true);
    expect(result.current.ruleType).toBe('TimeWindowPromotion');
    expect(result.current.timeWindowRule).toEqual({
      name: 'Rule 1',
      type: 'TimeWindowPromotion',
      enabled: true,
      startTime: '09:00',
      endTime: '17:00',
      discountPercent: 10,
    });
  });

  it('toggles rule when handleToggleRule is called', async () => {
    const { result } = renderHook(() => useRuleManagement());

    await act(async () => {
      await result.current.handleToggleRule(1);
    });

    expect(mockHooks.useUpdateRule().mutate).toHaveBeenCalledWith(1, { enabled: false });
    expect(toast.success).toHaveBeenCalledWith('ปิดใช้งานกฎสำเร็จ');
  });

  it('deletes rule when handleDeleteRule is called', async () => {
    const { result } = renderHook(() => useRuleManagement());
    
    await act(async () => {
      await result.current.handleDeleteRule(1);
    });
    
    expect(mockHooks.useDeleteRule().mutate).toHaveBeenCalledWith(1);
    expect(toast.success).toHaveBeenCalledWith('ลบกฎสำเร็จ');
  });

  it('handles WeightTier rule type correctly', () => {
    const { result } = renderHook(() => useRuleManagement());
    const rule = { $type: 'WeightTier', id: 1, name: 'Weight Rule', type: 'WeightTier', enabled: true, tiers: [{ minKg: 0, maxKg: 10, pricePerKg: 50 }] };
    
    act(() => {
      result.current.handleEditRule(rule);
    });
    
    expect(result.current.ruleType).toBe('WeightTier');
    expect(result.current.weightTierRule.tiers).toEqual([{ minKg: 0, maxKg: 10, pricePerKg: 50 }]);
  });

  it('handles RemoteAreaSurcharge rule type correctly', () => {
    const { result } = renderHook(() => useRuleManagement());
    const rule = { $type: 'RemoteAreaSurcharge', id: 1, name: 'Remote Rule', type: 'RemoteAreaSurcharge', enabled: true, remoteZipPrefixes: ['95', '96'], surchargeFlat: 30 };
    
    act(() => {
      result.current.handleEditRule(rule);
    });
    
    expect(result.current.ruleType).toBe('RemoteAreaSurcharge');
    expect(result.current.remoteAreaRule.remoteZipPrefixes).toEqual(['95', '96']);
    expect(result.current.remoteAreaRule.surchargeFlat).toBe(30);
  });
});
