import { Button } from '@mui/material';

import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';

type Props = Pick<
  ConfirmDialogProps<typeof Button>,
  'onConfirm' | 'dialogTitle' | 'dialogMessage'
>;

export function RemoveButton({ onConfirm, dialogTitle, dialogMessage }: Props) {
  return (
    <ConfirmDialog
      triggerComponent={Button}
      triggerProps={{
        variant: 'outlined',
        color: 'error',
        sx: { backgroundColor: (theme) => theme.palette.error.light },
      }}
      onConfirm={onConfirm}
      dialogTitle={dialogTitle}
      dialogMessage={dialogMessage}
    >
      Remove
    </ConfirmDialog>
  );
}
