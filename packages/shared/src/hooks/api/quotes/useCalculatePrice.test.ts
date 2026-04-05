import { renderHook, act } from '@testing-library/react';
import { useCalculatePrice } from './use-quotes';

jest.mock('@repo/shared/api', () => ({
  calculatePrice: jest.fn(),
}));

const mockCalculatePrice = require('@repo/shared/api').calculatePrice;

describe('useCalculatePrice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useCalculatePrice());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.result).toBe(null);
  });

  it('sets loading to true during mutation', async () => {
    mockCalculatePrice.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useCalculatePrice());
    
    act(() => {
      result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('sets result and clears loading on successful mutation', async () => {
    const mockResult = { total: 500, currency: 'THB' };
    mockCalculatePrice.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useCalculatePrice());
    
    await act(async () => {
      await result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.result).toEqual(mockResult);
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed mutation', async () => {
    const mockError = new Error('Failed to calculate');
    mockCalculatePrice.mockRejectedValue(mockError);
    const { result } = renderHook(() => useCalculatePrice());
    
    await act(async () => {
      try {
        await result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
      } catch (e) {
        // Expected
      }
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.result).toBe(null);
    expect(result.current.error).toBe('Failed to calculate');
  });

  it('returns result from mutate function', async () => {
    const mockResult = { total: 500, currency: 'THB' };
    mockCalculatePrice.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useCalculatePrice());
    
    let returnedResult;
    await act(async () => {
      returnedResult = await result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
    });
    
    expect(returnedResult).toEqual(mockResult);
  });

  it('throws error on failed mutation', async () => {
    const mockError = new Error('Failed to calculate');
    mockCalculatePrice.mockRejectedValue(mockError);
    const { result } = renderHook(() => useCalculatePrice());
    
    await expect(
      act(async () => {
        await result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
      })
    ).rejects.toThrow('Failed to calculate');
  });

  it('handles non-Error errors', async () => {
    mockCalculatePrice.mockRejectedValue('String error');
    const { result } = renderHook(() => useCalculatePrice());
    
    await act(async () => {
      try {
        await result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
      } catch (e) {
        // Expected
      }
    });
    
    expect(result.current.error).toBe('Failed to calculate price');
  });

  it('passes request to calculatePrice', async () => {
    const mockResult = { total: 500, currency: 'THB' };
    mockCalculatePrice.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useCalculatePrice());
    
    const request = { weightKg: 15, originZip: '11111', destinationZip: '22222' };
    await act(async () => {
      await result.current.mutate(request);
    });
    
    expect(mockCalculatePrice).toHaveBeenCalledWith(request);
    expect(mockCalculatePrice).toHaveBeenCalledTimes(1);
  });

  it('resets state for new mutation', async () => {
    const mockResult1 = { total: 500, currency: 'THB' };
    const mockResult2 = { total: 600, currency: 'THB' };
    mockCalculatePrice.mockResolvedValueOnce(mockResult1).mockResolvedValueOnce(mockResult2);
    const { result } = renderHook(() => useCalculatePrice());

    await act(async () => {
      await result.current.mutate({ weightKg: 10, originZip: '12345', destinationZip: '67890' });
    });
    expect(result.current.result).toEqual(mockResult1);

    await act(async () => {
      await result.current.mutate({ weightKg: 20, originZip: '54321', destinationZip: '09876' });
    });
    expect(result.current.result).toEqual(mockResult2);
  });
});
