'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import {
  FormEvent,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props<P> = {
  defaultValue?: string;
  onSubmit: (value: string) => void;
  helperText?: string;
  isError?: boolean;
  isPending?: boolean;
  reset?: () => void;
  isSuccess?: boolean;
  placeholder?: string;
  triggerComponent: FunctionComponent<P>;
  triggerProps: P;
  children?: ReactNode;
  onClick?: () => void;
  onClose?: () => void;
};

export function SingleInputDialog<P>({
  defaultValue = '',
  onSubmit,
  helperText,
  isError,
  isPending,
  reset,
  isSuccess = false,
  placeholder = '',
  triggerComponent: TriggerComponent,
  triggerProps,
  children,
  onClick,
  onClose,
}: Props<P>) {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleClose() {
    reset?.();
    setOpen(false);
    onClose?.();
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
      <TriggerComponent
        {...triggerProps}
        onClick={() => {
          setOpen(true);
          reset?.();
          onClick?.();
        }}
      >
        {children}
      </TriggerComponent>
      <Dialog
        open={open}
        component="form"
        onClose={handleClose}
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <TextField
            inputRef={inputRef}
            defaultValue={defaultValue}
            placeholder={placeholder}
            variant="outlined"
            helperText={helperText}
            onChange={handleChange}
            error={isError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" loading={isPending}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
