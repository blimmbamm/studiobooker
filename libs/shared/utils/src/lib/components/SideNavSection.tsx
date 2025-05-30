import { Box, BoxProps, Toolbar } from '@mui/material';

import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';

type Props = { title: string; children: ReactNode } & BoxProps;

export default function SideNavSection({ title, children }: Props) {
  return (
    <Box
      borderRight={1}
      borderColor={(theme) => theme.palette.divider}
      width={250}
      display="flex"
      flexDirection="column"
      position="fixed"
      top={0}
      bottom={0}
      sx={{ backgroundColor: 'white' }}
    >
      <Toolbar />
      <SectionTitle title={title} />
      {children}
    </Box>
  );
}
