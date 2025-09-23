import { Box, BoxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{} & BoxProps>;

export function CenteredLayoutBox({ children, ...boxProps }: Props) {
  return (
    <Box
      maxWidth={1000}
      margin={'auto'}
      sx={{ backgroundColor: 'white' }}
      minHeight={'100%'}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
