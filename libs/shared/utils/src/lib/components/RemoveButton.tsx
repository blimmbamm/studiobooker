import { Button, ButtonProps } from '@mui/material';

import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';

type Props = Pick<
  ConfirmDialogProps<typeof Button>,
  'onConfirm' | 'dialogTitle' | 'dialogMessage'
> & { buttonProps?: ButtonProps };

export function RemoveButton({
  onConfirm,
  dialogTitle,
  dialogMessage,
  buttonProps,
}: Props) {
  return (
    <ConfirmDialog
      triggerComponent={Button}
      triggerProps={{
        variant: 'outlined',
        color: 'error',
        sx: { backgroundColor: (theme) => theme.palette.error.light },
        ...buttonProps,
      }}
      onConfirm={onConfirm}
      dialogTitle={dialogTitle}
      dialogMessage={dialogMessage}
    >
      Remove
    </ConfirmDialog>
  );
}
