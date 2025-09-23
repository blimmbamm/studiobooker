import { useInputWithAutomaticAndDebouncedSubmission } from '@studiobooker/utils';

import { useEditServiceServiceCategory } from '../../../../hooks/queries/service.queries';

export function useSelectServiceCategory({
  serviceId,
  initialCategoryId,
}: {
  serviceId: number;
  initialCategoryId: number;
}) {
  const { isError, mutate } = useEditServiceServiceCategory();

  return useInputWithAutomaticAndDebouncedSubmission({
    initialValue: initialCategoryId.toString(),
    isError,
    onSubmit: (value: string) =>
      mutate({ serviceId, serviceCategoryId: +value }),
    debounceTimeout: 0,
  });
}
