import { FunctionComponent, ReactNode } from 'react';

import { ConfirmDialog } from '@studiobooker/utils';
import { ServiceCategory } from '../../../../../types/service-category';
import { useRemoveCategory } from '../../../../../hooks/service.queries';

type Props<P> = {
  component: FunctionComponent<P>;
  componentProps: P;
  category: ServiceCategory;
  children: ReactNode;
  onOpenDialog?: () => void;
  onCloseDialog?: () => void;
};

/**
 * Renders a confirm dialog together with the passed component
 * as trigger.
 *
 * `onOpenDialog` is an optional callback that is invoked when the
 * trigger is clicked, and `onCloseDialog` is invoked whenever the
 * dialog is closed.
 */
export default function RemoveCategory<P>({
  component,
  componentProps,
  children,
  category,
  onOpenDialog,
  onCloseDialog,
}: Props<P>) {
  const { mutate } = useRemoveCategory({});

  return (
    <ConfirmDialog
      triggerComponent={component}
      triggerProps={componentProps}
      onClickTrigger={onOpenDialog}
      onConfirm={() => mutate({ id: category.id })}
      onClose={onCloseDialog}
      dialogTitle="Remove category?"
      dialogMessage={`Removing this category will also remove all related services.
        This action cannot be undone. Are you sure? `}
    >
      {children}
    </ConfirmDialog>
  );
}
