import { PropsWithChildren } from 'react';
import { Section } from './Section';
import { SxProps } from '@mui/material';

type Props = { title?: string; sx?: SxProps } & PropsWithChildren;

export function SettingsSection({
  title = 'Settings',
  sx,
  children,
}: Props) {
  return (
    <Section
      title={title}
      contentBoxProps={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      sx={sx}
    >
      {children}
    </Section>
  );
}
