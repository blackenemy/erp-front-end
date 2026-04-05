import { renderHook, act } from '@testing-library/react';
import { useRules, useRule, useCreateRule, useUpdateRule, useDeleteRule } from './use-rules';

jest.mock('@repo/shared/api', () => ({
  getRules: jest.fn(),
  getRule: jest.fn(),
  createRule: jest.fn(),
  updateRule: jest.fn(),
  deleteRule: jest.fn(),
}));

const mockGetRules = require('@repo/shared/api').getRules;
const mockGetRule = require('@repo/shared/api').getRule;
const mockCreateRule = require('@repo/shared/api').createRule;
const mockUpdateRule = require('@repo/shared/api').updateRule;
const mockDeleteRule = require('@repo/shared/api').deleteRule;

describe('useRules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useRules());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual([]);
  });

  it('fetches rules on mount', async () => {
    const mockRules = [{ id: 1, name: 'Rule 1', enabled: true }];
    mockGetRules.mockResolvedValue(mockRules);
    renderHook(() => useRules());
    
    expect(mockGetRules).toHaveBeenCalledTimes(1);
  });

  it('sets loading to true during fetch', async () => {
    mockGetRules.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useRules());
    
    expect(result.current.loading).toBe(true);
  });

  it('sets data and clears loading on successful fetch', async () => {
    const mockRules = [{ id: 1, name: 'Rule 1', enabled: true }];
    mockGetRules.mockResolvedValue(mockRules);
    const { result } = renderHook(() => useRules());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockRules);
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed fetch', async () => {
    const mockError = new Error('Failed to fetch rules');
    mockGetRules.mockRejectedValue(mockError);
    const { result } = renderHook(() => useRules());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch rules');
  });

  it('refetches when refetch is called', async () => {
    const mockRules1 = [{ id: 1, name: 'Rule 1', enabled: true }];
    const mockRules2 = [{ id: 2, name: 'Rule 2', enabled: true }];
    mockGetRules.mockResolvedValue(mockRules1);
    const { result } = renderHook(() => useRules());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(result.current.data).toEqual(mockRules1);
    
    mockGetRules.mockResolvedValue(mockRules2);
    await act(async () => {
      await result.current.refetch();
    });
    expect(result.current.data).toEqual(mockRules2);
  });
});

describe('useRule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useRule(null));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('does not fetch when id is null', () => {
    mockGetRule.mockResolvedValue({ id: 1, name: 'Rule 1', enabled: true });
    renderHook(() => useRule(null));
    
    expect(mockGetRule).not.toHaveBeenCalled();
  });

  it('fetches rule when id is provided', async () => {
    const mockRule = { id: 1, name: 'Rule 1', enabled: true };
    mockGetRule.mockResolvedValue(mockRule);
    renderHook(() => useRule(1));
    
    expect(mockGetRule).toHaveBeenCalledWith(1);
  });

  it('sets data and clears loading on successful fetch', async () => {
    const mockRule = { id: 1, name: 'Rule 1', enabled: true };
    mockGetRule.mockResolvedValue(mockRule);
    const { result } = renderHook(() => useRule(1));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockRule);
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed fetch', async () => {
    const mockError = new Error('Failed to fetch rule');
    mockGetRule.mockRejectedValue(mockError);
    const { result } = renderHook(() => useRule(1));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Failed to fetch rule');
  });
});

describe('useCreateRule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useCreateRule());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets loading to true during mutation', async () => {
    mockCreateRule.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useCreateRule());
    
    act(() => {
      result.current.mutate({ name: 'New Rule', type: 'WeightTier', enabled: true });
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('sets result and clears loading on successful mutation', async () => {
    const mockRule = { id: 1, name: 'New Rule', type: 'WeightTier', enabled: true };
    mockCreateRule.mockResolvedValue(mockRule);
    const { result } = renderHook(() => useCreateRule());
    
    await act(async () => {
      await result.current.mutate({ name: 'New Rule', type: 'WeightTier', enabled: true });
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed mutation', async () => {
    const mockError = new Error('Failed to create rule');
    mockCreateRule.mockRejectedValue(mockError);
    const { result } = renderHook(() => useCreateRule());
    
    await act(async () => {
      try {
        await result.current.mutate({ name: 'New Rule', type: 'WeightTier', enabled: true });
      } catch (e) {
        // Expected
      }
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to create rule');
  });

  it('returns result from mutate function', async () => {
    const mockRule = { id: 1, name: 'New Rule', type: 'WeightTier', enabled: true };
    mockCreateRule.mockResolvedValue(mockRule);
    const { result } = renderHook(() => useCreateRule());
    
    let returnedResult;
    await act(async () => {
      returnedResult = await result.current.mutate({ name: 'New Rule', type: 'WeightTier', enabled: true });
    });
    
    expect(returnedResult).toEqual(mockRule);
  });
});

describe('useUpdateRule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useUpdateRule());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets loading to true during mutation', async () => {
    mockUpdateRule.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useUpdateRule());
    
    act(() => {
      result.current.mutate(1, { name: 'Updated Rule', enabled: false });
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('sets result and clears loading on successful mutation', async () => {
    const mockRule = { id: 1, name: 'Updated Rule', enabled: false };
    mockUpdateRule.mockResolvedValue(mockRule);
    const { result } = renderHook(() => useUpdateRule());
    
    await act(async () => {
      await result.current.mutate(1, { name: 'Updated Rule', enabled: false });
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed mutation', async () => {
    const mockError = new Error('Failed to update rule');
    mockUpdateRule.mockRejectedValue(mockError);
    const { result } = renderHook(() => useUpdateRule());
    
    await act(async () => {
      try {
        await result.current.mutate(1, { name: 'Updated Rule', enabled: false });
      } catch (e) {
        // Expected
      }
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to update rule');
  });

  it('passes id and input to updateRule', async () => {
    const mockRule = { id: 1, name: 'Updated Rule', enabled: false };
    mockUpdateRule.mockResolvedValue(mockRule);
    const { result } = renderHook(() => useUpdateRule());
    
    await act(async () => {
      await result.current.mutate(1, { name: 'Updated Rule', enabled: false });
    });
    
    expect(mockUpdateRule).toHaveBeenCalledWith(1, { name: 'Updated Rule', enabled: false });
  });
});

describe('useDeleteRule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useDeleteRule());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets loading to true during mutation', async () => {
    mockDeleteRule.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useDeleteRule());
    
    act(() => {
      result.current.mutate(1);
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('sets result and clears loading on successful mutation', async () => {
    mockDeleteRule.mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteRule());
    
    await act(async () => {
      await result.current.mutate(1);
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed mutation', async () => {
    const mockError = new Error('Failed to delete rule');
    mockDeleteRule.mockRejectedValue(mockError);
    const { result } = renderHook(() => useDeleteRule());
    
    await act(async () => {
      try {
        await result.current.mutate(1);
      } catch (e) {
        // Expected
      }
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to delete rule');
  });

  it('returns true on successful deletion', async () => {
    mockDeleteRule.mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteRule());
    
    let returnedResult;
    await act(async () => {
      returnedResult = await result.current.mutate(1);
    });
    
    expect(returnedResult).toBe(true);
  });

  it('passes id to deleteRule', async () => {
    mockDeleteRule.mockResolvedValue(undefined);
    const { result } = renderHook(() => useDeleteRule());
    
    await act(async () => {
      await result.current.mutate(1);
    });
    
    expect(mockDeleteRule).toHaveBeenCalledWith(1);
  });
});
