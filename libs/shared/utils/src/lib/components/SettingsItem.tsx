import { Box, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = {
  title: string;
  description: string;
} & PropsWithChildren;

export function SettingsItem({ title, description, children }: Props) {
  return (
    <>
      <Box>
        <Typography fontWeight={'bold'} variant="h6">
          {title}
        </Typography>
        <Typography variant="body2" whiteSpace="pre-line">
          {description}
        </Typography>
      </Box>
      {children}
    </>
  );
}
