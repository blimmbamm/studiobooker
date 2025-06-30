import { SxProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Section } from './Section';

type Props = {
  title: string;
  columns: number;
  sx?: SxProps;
} & PropsWithChildren;

export function TableSection({ title, columns, sx, children }: Props) {
  return (
    <Section
      title={title}
      contentBoxProps={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, auto)`,
        alignItems: 'center',
        width: 'fit-content',
        rowGap: 1,
        columnGap: 3,
      }}
      sx={sx}
    >
      {children}
    </Section>
  );
}
