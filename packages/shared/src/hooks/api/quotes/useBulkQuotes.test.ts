import { renderHook, act } from '@testing-library/react';
import { useBulkQuotes } from './use-quotes';

jest.mock('@repo/shared/api', () => ({
  submitBulkQuotes: jest.fn(),
}));

const mockSubmitBulkQuotes = require('@repo/shared/api').submitBulkQuotes;

describe('useBulkQuotes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useBulkQuotes());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.jobId).toBe(null);
  });

  it('sets loading to true during mutation', async () => {
    mockSubmitBulkQuotes.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useBulkQuotes());
    
    act(() => {
      result.current.mutate([{ weightKg: 10, originZip: '12345', destinationZip: '67890' }]);
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.jobId).toBe(null);
  });

  it('sets jobId and clears loading on successful mutation', async () => {
    const mockResult = { jobId: 'job-123' };
    mockSubmitBulkQuotes.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useBulkQuotes());
    
    await act(async () => {
      await result.current.mutate([{ weightKg: 10, originZip: '12345', destinationZip: '67890' }]);
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.jobId).toBe('job-123');
    expect(result.current.error).toBe(null);
  });

  it('sets error and clears loading on failed mutation', async () => {
    const mockError = new Error('Failed to submit');
    mockSubmitBulkQuotes.mockRejectedValue(mockError);
    const { result } = renderHook(() => useBulkQuotes());

    await act(async () => {
      try {
        await result.current.mutate([{ weightKg: 10, originZip: '12345', destinationZip: '67890' }]);
      } catch (e) {
        // Expected
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.jobId).toBe(null);
    expect(result.current.error).toBe('Failed to submit');
  });

  it('returns result from mutate function', async () => {
    const mockResult = { jobId: 'job-456' };
    mockSubmitBulkQuotes.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useBulkQuotes());
    
    let returnedResult;
    await act(async () => {
      returnedResult = await result.current.mutate([{ weightKg: 15, originZip: '11111', destinationZip: '22222' }]);
    });
    
    expect(returnedResult).toEqual(mockResult);
  });

  it('throws error on failed mutation', async () => {
    const mockError = new Error('Failed to submit');
    mockSubmitBulkQuotes.mockRejectedValue(mockError);
    const { result } = renderHook(() => useBulkQuotes());
    
    await expect(
      act(async () => {
        await result.current.mutate([{ weightKg: 10, originZip: '12345', destinationZip: '67890' }]);
      })
    ).rejects.toThrow('Failed to submit');
  });

  it('handles non-Error errors', async () => {
    mockSubmitBulkQuotes.mockRejectedValue('String error');
    const { result } = renderHook(() => useBulkQuotes());
    
    await act(async () => {
      try {
        await result.current.mutate([{ weightKg: 10, originZip: '12345', destinationZip: '67890' }]);
      } catch (e) {
        // Expected
      }
    });
    
    expect(result.current.error).toBe('Failed to submit bulk quotes');
  });

  it('passes request to submitBulkQuotes', async () => {
    const mockResult = { jobId: 'job-789' };
    mockSubmitBulkQuotes.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useBulkQuotes());
    
    const request = [{ weightKg: 20, originZip: '33333', destinationZip: '44444' }];
    await act(async () => {
      await result.current.mutate(request);
    });
    
    expect(mockSubmitBulkQuotes).toHaveBeenCalledWith(request);
    expect(mockSubmitBulkQuotes).toHaveBeenCalledTimes(1);
  });

  it('resets state for new mutation', async () => {
    const mockResult1 = { jobId: 'job-1' };
    const mockResult2 = { jobId: 'job-2' };
    mockSubmitBulkQuotes.mockResolvedValueOnce(mockResult1).mockResolvedValueOnce(mockResult2);
    const { result } = renderHook(() => useBulkQuotes());

    await act(async () => {
      await result.current.mutate([{ weightKg: 10, originZip: '12345', destinationZip: '67890' }]);
    });
    expect(result.current.jobId).toBe('job-1');

    await act(async () => {
      await result.current.mutate([{ weightKg: 30, originZip: '55555', destinationZip: '66666' }]);
    });
    expect(result.current.jobId).toBe('job-2');
  });
});
