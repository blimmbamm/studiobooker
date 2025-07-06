import { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog } from '@mui/material';

type DialogContextType = {
  renderDialog: (children: ReactNode) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within a DialogProvider');
  return ctx;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  const renderDialog = (content: ReactNode) => {
    setDialogContent(content);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ renderDialog, closeDialog }}>
      {children}
      <Dialog
        open={open}
        onClose={closeDialog}
        // maxWidth="sm"
        // fullWidth
      >
        {dialogContent}
      </Dialog>
    </DialogContext.Provider>
  );
};
