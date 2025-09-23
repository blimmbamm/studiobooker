import { FunctionComponent, ReactNode } from 'react';

import { SingleInputDialog, ServiceCategory } from '@studiobooker/utils';

import { useEditServiceCategory } from '../../../../../hooks/queries/service.queries';

type Props = {
  component: FunctionComponent;
  category: ServiceCategory;
  children: ReactNode;
  onOpenDialog?: () => void;
  onCloseDialog?: () => void;
};

export default function RenameCategory({
  component,
  category,
  children,
  onOpenDialog,
  onCloseDialog,
}: Props) {
  const { mutate, error, isError, isPending, isSuccess, reset } =
    useEditServiceCategory({ withOptimisticUpdating: true });

  return (
    <SingleInputDialog
      onClick={onOpenDialog}
      onClose={onCloseDialog}
      triggerComponent={component}
      triggerProps={{}}
      defaultValue={category.name}
      onSubmit={(name) => mutate({ id: category.id, inputs: { name } })}
      helperText={error?.message}
      isError={isError}
      isPending={isPending}
      isSuccess={isSuccess}
      placeholder="Category name"
      reset={reset}
    >
      {children}
    </SingleInputDialog>
  );
}
