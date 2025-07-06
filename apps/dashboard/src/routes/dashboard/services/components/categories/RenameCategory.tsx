import { FunctionComponent, ReactNode } from 'react';

import { SingleInputDialog } from '@studiobooker/utils';
import { ServiceCategory } from '../../../../../types/service-category';
import { useEditServiceCategory } from '../../../../../hooks/service.queries';

type Props = {
  component: FunctionComponent;
  category: ServiceCategory;
  children: ReactNode;
  onClick?: () => void;
  onClose?: () => void;
};

export default function RenameCategory({
  component,
  category,
  children,
  onClick,
  onClose,
}: Props) {
  const { mutate, error, isError, isPending, isSuccess, reset } =
    useEditServiceCategory({ withOptimisticUpdating: true });

  return (
    <SingleInputDialog
      onClick={onClick}
      onClose={onClose}
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
