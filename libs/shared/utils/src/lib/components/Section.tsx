import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import SectionTitle from './SectionTitle';

type Props = {
  title: string;
  children: ReactNode;
  contentBoxProps?: BoxProps;
};

export default function Section({
  title,
  children,
  contentBoxProps,
}: Props) {
  return (
    <Box component="section">
      <SectionTitle title={title} />
      <Box padding={2} {...contentBoxProps}>
        {children}
      </Box>
    </Box>
  );
}
