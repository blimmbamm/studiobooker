import { PropsWithChildren } from 'react';
import { TableSection } from './TableSection';

type Props = { title: string } & PropsWithChildren;

export function PropertiesTableSection({ title, children }: Props) {
  return (
    <TableSection
      title={title}
      columns={2}
      tableSx={{ width: 'fit-content', rowGap: 1 }}
    >
      {children}
    </TableSection>
  );
}
