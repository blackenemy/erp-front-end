import { useImmer } from 'use-immer';
import { calculatePrice, submitBulkQuotes, getJobStatus, type QuoteRequest, type QuoteResult, type BulkQuoteRequest, type BulkQuoteResponse, type QuoteJob } from '@repo/shared/api';

export function useCalculatePrice() {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
    result: QuoteResult | null;
  }>({
    loading: false,
    error: null,
    result: null,
  });

  const mutate = async (request: QuoteRequest) => {
    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const result = await calculatePrice(request);
      setState(draft => {
        draft.result = result;
        draft.loading = false;
      });
      return result;
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to calculate price';
        draft.loading = false;
      });
      throw error;
    }
  };

  return { ...state, mutate };
}

export function useBulkQuotes() {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
    jobId: string | null;
  }>({
    loading: false,
    error: null,
    jobId: null,
  });

  const mutate = async (request: BulkQuoteRequest) => {
    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const result = await submitBulkQuotes(request);
      setState(draft => {
        draft.jobId = result.jobId;
        draft.loading = false;
      });
      return result;
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to submit bulk quotes';
        draft.loading = false;
      });
      throw error;
    }
  };

  return { ...state, mutate };
}

export function useJobStatus(jobId: string | null) {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
    job: QuoteJob | null;
  }>({
    loading: false,
    error: null,
    job: null,
  });

  const refetch = async () => {
    if (!jobId) return;

    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const job = await getJobStatus(jobId);
      setState(draft => {
        draft.job = job;
        draft.loading = false;
      });
      return job;
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to get job status';
        draft.loading = false;
      });
      throw error;
    }
  };

  return { ...state, refetch };
}
