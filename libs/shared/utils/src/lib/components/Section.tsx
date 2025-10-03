import { Box, BoxProps, SxProps } from '@mui/material';
import { ReactNode } from 'react';

import SectionTitle from './SectionTitle';

type Props = {
  title: string;
  children: ReactNode;
  contentBoxProps?: BoxProps;
  sectionError?: string;
  sx?: SxProps;
};

export function Section({
  title,
  children,
  contentBoxProps,
  sectionError,
  sx,
}: Props) {
  return (
    <Box component="section" sx={sx}>
      <SectionTitle title={title} sectionError={sectionError} />
      <Box paddingInline={4} {...contentBoxProps}>
        {children}
      </Box>
    </Box>
  );
}
