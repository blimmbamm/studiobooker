import { useMutation } from '@tanstack/react-query';

import {
  useDebouncedCallback,
  useQueryClient,
  editWorkingTime,
  editWorkingTimeSetting,
  EditWorkingTimeDto,
  WorkingTime,
  StaffStructured,
  CompanyStructured,
} from '@studiobooker/utils';
import { CompanyQueryKeys } from './company.queries';

export function useEditWorkingTime({
  workingTimeId,
  staffId,
}: {
  workingTimeId: number;
  staffId: number;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ inputs }: { inputs: EditWorkingTimeDto }) =>
      editWorkingTime(workingTimeId, inputs),
    onMutate: ({ inputs }) => {
      queryClient.cancelQueries({ queryKey: ['staff', staffId] });

      const prevStaff = queryClient.getQueryData<StaffStructured>([
        'staff',
        staffId,
      ]);

      queryClient.setQueryData<StaffStructured>(['staff', staffId], (data) => {
        if (!data) return data;

        const optimisticallyUpdatedStaff: StaffStructured = {
          ...data,
          workingTimes: data.workingTimes.map((wt) =>
            wt.id === workingTimeId ? { ...wt, ...inputs } : wt
          ),
        };

        return optimisticallyUpdatedStaff;
      });
      return { prevStaff };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['staff', staffId], context?.prevStaff);
    },
  });

  const [mutateDebounced, cancelMutateDebounced] = useDebouncedCallback(
    (variables: { inputs: EditWorkingTimeDto; onEdit?: () => void }) => {
      variables.onEdit?.();
      mutation.mutate(variables);
    },
    500
  );

  return {
    ...mutation,
    mutateDebounced,
    cancelMutateDebounced,
  };
}

export function useEditWorkingTimeSetting({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ inputs }: { inputs: EditWorkingTimeDto }) =>
      editWorkingTimeSetting(id, inputs),
    onMutate: ({ inputs }) => {
      // optimistically update company query
      // Actually, this is not really needed IF only start and end of working time settings are edited via TimePicker
      // These changes are visible right away in any case, so no need for optimistic updating...
      const queryKey = CompanyQueryKeys.COMPANY_STRUCTURED;

      queryClient.cancelQueries({ queryKey });

      const prevCompany = queryClient.getQueryData<CompanyStructured>(queryKey);

      queryClient.setQueryData<CompanyStructured>(queryKey, (data) => {
        if (!data) return data;

        const newData = structuredClone(data);
        newData.workingTimeSettings =
          newData.workingTimeSettings.map<WorkingTime>((wt) =>
            wt.id === id ? { ...wt, ...inputs } : wt
          );

        return newData;
      });

      return { prevCompany, queryKey };
    },
    onSuccess: (_d, _v, { queryKey }) => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData<CompanyStructured>(
          context.queryKey,
          context.prevCompany
        );
      }
    },
  });

  const [mutateDebounced, cancelMutateDebounced] = useDebouncedCallback(
    (variables: { inputs: EditWorkingTimeDto; onEdit?: () => void }) => {
      variables.onEdit?.();
      mutation.mutate(variables);
    },
    500
  );

  return {
    ...mutation,
    mutateDebounced,
    cancelMutateDebounced,
  };
}
