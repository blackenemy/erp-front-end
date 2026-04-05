import { renderHook, act } from '@testing-library/react';
import { useJobStatus } from './use-quotes';

jest.mock('@repo/shared/api', () => ({
  getJobStatus: jest.fn(),
}));

const mockGetJobStatus = require('@repo/shared/api').getJobStatus;

describe('useJobStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct state', () => {
    const { result } = renderHook(() => useJobStatus(null));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.job).toBe(null);
  });

  it('does not fetch when jobId is null', () => {
    mockGetJobStatus.mockResolvedValue({ id: 'job-1', status: 'completed' });
    renderHook(() => useJobStatus(null));
    
    expect(mockGetJobStatus).not.toHaveBeenCalled();
  });

  it('fetches job status when jobId is provided', async () => {
    const mockJob = { id: 'job-1', status: 'completed', quotes: [] };
    mockGetJobStatus.mockResolvedValue(mockJob);
    const { result } = renderHook(() => useJobStatus('job-1'));
    
    expect(result.current.loading).toBe(true);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.job).toEqual(mockJob);
    expect(mockGetJobStatus).toHaveBeenCalledWith('job-1');
  });

  it('sets error and clears loading on failed fetch', async () => {
    const mockError = new Error('Failed to get job status');
    mockGetJobStatus.mockRejectedValue(mockError);
    const { result } = renderHook(() => useJobStatus('job-1'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.job).toBe(null);
    expect(result.current.error).toBe('Failed to get job status');
  });

  it('returns result from refetch function', async () => {
    const mockJob = { id: 'job-1', status: 'completed', quotes: [] };
    mockGetJobStatus.mockResolvedValue(mockJob);
    const { result } = renderHook(() => useJobStatus('job-1'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const refetchResult = await act(async () => {
      return await result.current.refetch();
    });
    
    expect(refetchResult).toEqual(mockJob);
  });

  it('throws error on failed refetch', async () => {
    const mockError = new Error('Failed to get job status');
    mockGetJobStatus.mockRejectedValue(mockError);
    const { result } = renderHook(() => useJobStatus('job-1'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    await expect(
      act(async () => {
        await result.current.refetch();
      })
    ).rejects.toThrow('Failed to get job status');
  });

  it('handles non-Error errors', async () => {
    mockGetJobStatus.mockRejectedValue('String error');
    const { result } = renderHook(() => useJobStatus('job-1'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.error).toBe('Failed to get job status');
  });

  it('refetches when refetch is called', async () => {
    const mockJob1 = { id: 'job-1', status: 'processing', quotes: [] };
    const mockJob2 = { id: 'job-1', status: 'completed', quotes: [] };
    mockGetJobStatus.mockResolvedValue(mockJob1);
    const { result } = renderHook(() => useJobStatus('job-1'));
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(result.current.job).toEqual(mockJob1);
    
    mockGetJobStatus.mockResolvedValue(mockJob2);
    await act(async () => {
      await result.current.refetch();
    });
    expect(result.current.job).toEqual(mockJob2);
    expect(mockGetJobStatus).toHaveBeenCalledTimes(2);
  });

  it('does not refetch when jobId is null', async () => {
    mockGetJobStatus.mockResolvedValue({ id: 'job-1', status: 'completed' });
    const { result } = renderHook(() => useJobStatus(null));
    
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(mockGetJobStatus).not.toHaveBeenCalled();
  });

  it('fetches on mount when jobId is provided', async () => {
    const mockJob = { id: 'job-1', status: 'completed', quotes: [] };
    mockGetJobStatus.mockResolvedValue(mockJob);
    renderHook(() => useJobStatus('job-1'));
    
    expect(mockGetJobStatus).toHaveBeenCalledWith('job-1');
    expect(mockGetJobStatus).toHaveBeenCalledTimes(1);
  });
});
