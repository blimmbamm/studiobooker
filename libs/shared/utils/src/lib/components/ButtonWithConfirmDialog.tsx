import { Button, ButtonProps } from '@mui/material';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

export type ButtonWithConfirmDialogProps = {
  onConfirm: () => void;
  buttonProps: ButtonProps;
  buttonLabel: string;
  dialogTitle: string;
  dialogMessage: string;
};

export function ButtonWithConfirmDialog({
  onConfirm,
  buttonProps,
  buttonLabel,
  dialogTitle,
  dialogMessage,
}: ButtonWithConfirmDialogProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setConfirmDialogOpen(true)}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title={dialogTitle}
        message={dialogMessage}
        onConfirm={onConfirm}
      />
    </>
  );
}
