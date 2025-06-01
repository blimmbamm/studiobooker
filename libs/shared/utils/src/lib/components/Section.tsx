import { Box, BoxProps, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';

type Props = {
  title: string;
  children: ReactNode;
  contentBoxProps?: BoxProps;
  sx?: SxProps;
};

export default function Section({
  title,
  children,
  contentBoxProps,
  sx,
}: Props) {
  return (
    <Box component="section" sx={sx}>
      <SectionTitle title={title} />
      <Box padding={2} {...contentBoxProps}>
        {children}
      </Box>
    </Box>
  );
}
