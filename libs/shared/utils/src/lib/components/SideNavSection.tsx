import { Box, BoxProps, Toolbar } from '@mui/material';

import SectionTitle from './SectionTitle';
import { JSX, ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  actionComponent?: JSX.Element;
} & BoxProps;

export function SideNavSection({ title, children, actionComponent }: Props) {
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
      <SectionTitle title={title} actionComponent={actionComponent} />
      {children}
    </Box>
  );
}
