import { FunctionComponent, ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
} from '@mui/material';

export type ConfirmDialogProps<P> = {
  triggerComponent: FunctionComponent<P>;
  triggerProps: P;
  onClickTrigger?: () => void;
  children?: ReactNode;
  onConfirm: () => void;
  dialogTitle: string;
  dialogMessage: string;
  onClose?: () => void;
};

export function ConfirmDialog<P>({
  triggerComponent: TriggerComponent,
  triggerProps,
  onClickTrigger,
  children,
  onConfirm,
  dialogTitle,
  dialogMessage,
  onClose,
}: ConfirmDialogProps<P>) {
  const [open, setOpen] = useState(false);

  function handleClose() {
    onClose?.();
    setOpen(false);
  }

  return (
    <>
      <TriggerComponent
        {...triggerProps}
        onClick={() => {
          setOpen(true);
          onClickTrigger?.();
        }}
      >
        {children}
      </TriggerComponent>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            autoFocus
            variant="contained"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
