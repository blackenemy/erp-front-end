import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { getRules, getRule, createRule, updateRule, deleteRule, type Rule, type RuleInput, type UpdateRuleInput } from '@repo/shared/api';

export function useRules() {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
    data: Rule[];
  }>({
    loading: false,
    error: null,
    data: [],
  });

  const fetch = async () => {
    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const data = await getRules();
      setState(draft => {
        draft.data = data;
        draft.loading = false;
      });
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to fetch rules';
        draft.loading = false;
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, refetch: fetch };
}

export function useRule(id: number | string | null) {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
    data: Rule | null;
  }>({
    loading: false,
    error: null,
    data: null,
  });

  const fetch = async () => {
    if (!id) return;

    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const data = await getRule(id);
      setState(draft => {
        draft.data = data;
        draft.loading = false;
      });
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to fetch rule';
        draft.loading = false;
      });
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  return { ...state, refetch: fetch };
}

export function useCreateRule() {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const mutate = async (input: RuleInput) => {
    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const result = await createRule(input);
      setState(draft => {
        draft.loading = false;
      });
      return result;
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to create rule';
        draft.loading = false;
      });
      throw error;
    }
  };

  return { ...state, mutate };
}

export function useUpdateRule() {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const mutate = async (id: number | string, input: UpdateRuleInput) => {
    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const result = await updateRule(id, input);
      setState(draft => {
        draft.loading = false;
      });
      return result;
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to update rule';
        draft.loading = false;
      });
      throw error;
    }
  };

  return { ...state, mutate };
}

export function useDeleteRule() {
  const [state, setState] = useImmer<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const mutate = async (id: number | string) => {
    setState(draft => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      await deleteRule(id);
      setState(draft => {
        draft.loading = false;
      });
      return true;
    } catch (error) {
      setState(draft => {
        draft.error = error instanceof Error ? error.message : 'Failed to delete rule';
        draft.loading = false;
      });
      throw error;
    }
  };

  return { ...state, mutate };
}
