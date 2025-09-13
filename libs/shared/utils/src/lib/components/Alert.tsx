'use client';

import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type AlertContextType = {
  show: (args: AlertOptions) => void;
};

type AlertOptions = {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: PropsWithChildren) {
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: AlertColor;
    message: string;
    autoHideDuration: number;
  }>({
    open: false,
    severity: 'error',
    message: 'Default message',
    autoHideDuration: 3000,
  });

  function handleClose() {
    setAlert((prev) => ({ ...prev, open: false }));
  }

  function show({
    message,
    severity = 'error',
    autoHideDuration = 3000,
  }: AlertOptions) {
    setAlert({ open: true, severity, message, autoHideDuration });
  }

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%', textAlign: 'center' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const alertContext = useContext(AlertContext);

  if (!alertContext)
    throw new Error('useAlert must be used within AlertProvider');

  return alertContext;
}
