import { SxProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Section } from './Section';

type Props = {
  title: string;
  columns: number;
  sectionError?: string;
  sx?: SxProps;
  tableSx?: SxProps;
} & PropsWithChildren;

export function TableSection({
  title,
  columns,
  sectionError,
  sx,
  tableSx,
  children,
}: Props) {
  return (
    <Section
      title={title}
      sectionError={sectionError}
      contentBoxProps={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, auto)`,
        alignItems: 'center',
        rowGap: 2,
        columnGap: 3,
        sx: tableSx,
      }}
      sx={sx}
    >
      {children}
    </Section>
  );
}
