import { Box, Button, Typography } from '@mui/material';
import { ConfirmDialog } from './ConfirmDialog';
import { useState } from 'react';

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  onAction: () => void;
  confirmActionDialogTitle: string;
  confirmActionDialogMessage: string;
};

export function SettingsItem({
  title,
  description,
  buttonLabel,
  onAction,
  confirmActionDialogTitle,
  confirmActionDialogMessage,
}: Props) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  return (
    <>
      <Box>
        <Typography fontWeight={'bold'} variant="h6">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
      <Button
        variant="outlined"
        onClick={() => setConfirmDialogOpen(true)}
        color="error"
        sx={{ backgroundColor: (theme) => theme.palette.error.light }}
      >
        {buttonLabel}
      </Button>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        title={confirmActionDialogTitle}
        message={confirmActionDialogMessage}
        onConfirm={onAction}
      />
    </>
  );
}
