import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  onClose,
  title,
  message,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button autoFocus variant="contained" onClick={onConfirm}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
