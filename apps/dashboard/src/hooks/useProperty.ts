import { UseMutationResult } from '@tanstack/react-query';

import {
  QueryError,
  useInputWithAutomaticAndDebouncedSubmission,
} from '@studiobooker/utils';

export function createUseProperty<TEditDto, TEntity extends TEditDto>({
  editMutation,
}: {
  editMutation: (
    entity: TEntity
  ) => UseMutationResult<TEntity, QueryError, { input: TEditDto }>;
}) {
  return function <K extends keyof TEditDto>({
    property,
    entity,
    parseProperty,
    updateValueIf,
    submitValueIf,
    validationErrorHelperText,
  }: {
    entity: TEntity;
    property: K;
    parseProperty: (value: string) => TEditDto[K];
    updateValueIf?: (value: string) => boolean;
    submitValueIf?: (value: string) => boolean;
    validationErrorHelperText?: string;
  }) {
    const mutation = editMutation(entity);

    return useInputWithAutomaticAndDebouncedSubmission({
      initialValue: entity[property]?.toString() || '',
      updateValueIf,
      submitValueIf,
      isError: mutation.isError,
      validationErrorHelperText,
      onSubmit: (value: string) =>
        mutation.mutate({
          input: {
            [property]: parseProperty(value),
          } as TEditDto,
        }),
    });
  };
}
