import { SxProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Section } from './Section';

type Props = {
  title: string;
  columns: number;
  sx?: SxProps;
  tableSx?: SxProps;
} & PropsWithChildren;

export function TableSection({ title, columns, sx, tableSx, children }: Props) {
  return (
    <Section
      title={title}
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
