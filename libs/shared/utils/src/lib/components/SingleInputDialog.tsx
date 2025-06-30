import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
} from '@mui/material';
import { FormEvent, JSX, useEffect, useRef, useState } from 'react';

type Props = {
  buttonIcon: JSX.Element;
  onSubmit: (value: string) => void;
  helperText?: string;
  isError?: boolean;
  isPending?: boolean;
  reset?: () => void;
  isSuccess?: boolean;
  placeholder?: string;
};

export function SingleInputDialog({
  buttonIcon,
  onSubmit,
  helperText,
  isError,
  isPending,
  reset,
  isSuccess = false,
  placeholder = '',
}: Props) {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleClose() {
    reset?.();
    setOpen(false);
  }

  function handleChange() {
    if (isError) {
      reset?.();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.(inputRef.current?.value || '');
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
          reset?.();
        }}
      >
        {buttonIcon}
      </IconButton>
      <Dialog
        open={open}
        component="form"
        onClose={handleClose}
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <TextField
            inputRef={inputRef}
            placeholder={placeholder}
            variant="outlined"
            helperText={helperText}
            onChange={handleChange}
            error={isError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending && <CircularProgress color="inherit" size={'1.5rem'} />}
            {!isPending && 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
