'use client';

import { Box, Dialog, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
        disableRestoreFocus
      >
        <Box p={2} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
          <TextField
            size="small"
            inputRef={inputRef}
            defaultValue={defaultValue}
            placeholder={placeholder}
            variant="outlined"
            helperText={helperText}
            onChange={handleChange}
            error={isError}
            autoFocus
          />
          <IconButton type="submit" loading={isPending}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
}
