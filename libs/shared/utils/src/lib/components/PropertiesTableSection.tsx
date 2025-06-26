import { PropsWithChildren } from 'react';
import { Section } from './Section';

type Props = { title: string } & PropsWithChildren;

export function PropertiesTableSection({ title, children }: Props) {
  return (
    <Section
      title={title}
      contentBoxProps={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        width: 'fit-content',
        rowGap: 1,
        columnGap: 3,
      }}
    >
      {children}
    </Section>
  );
}
