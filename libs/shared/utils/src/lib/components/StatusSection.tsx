import {
  Box,
  FormControlLabel,
  Skeleton,
  styled,
  Switch,
  Typography,
} from '@mui/material';
import { Section } from './Section';
import { ReactNode } from 'react';

type Props<T> = {
  entity?: T;
  activeStatusText: ReactNode;
  inactiveStatusText: ReactNode;
  title?: string;
  activated: (entity: T) => boolean;
  onToggleActivation: (entity: T) => void;
};

export function StatusSection<T>({
  activeStatusText,
  inactiveStatusText,
  title = 'Status',
  entity,
  activated,
  onToggleActivation,
}: Props<T>) {
  const StatusLabelTypography = styled(Typography)({ fontSize: '1rem' });
  const StatusTextTypography = styled(Typography)({ fontSize: '0.8rem' });

  return (
    <Section
      title={title}
      contentBoxProps={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        display={'grid'}
        gridTemplateColumns={'auto auto'}
        alignItems={'center'}
        columnGap={4}
        rowGap={2}
      >
        <StatusLabelTypography>Active</StatusLabelTypography>
        <StatusTextTypography>{activeStatusText}</StatusTextTypography>
        <StatusLabelTypography>Inactive</StatusLabelTypography>
        <StatusTextTypography>{inactiveStatusText}</StatusTextTypography>
      </Box>
      {entity && (
        <FormControlLabel
          checked={activated(entity)}
          onChange={() => onToggleActivation(entity)}
          control={<Switch color="primary" />}
          label={activated(entity) ? 'Active' : 'Inactive'}
          labelPlacement="top"
        />
      )}
      {!entity && (
        <FormControlLabel
          disabled
          control={<Switch color="primary" />}
          label={<Skeleton />}
          labelPlacement="top"
        />
      )}
    </Section>
  );
}
