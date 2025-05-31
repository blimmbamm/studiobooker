import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { JSX } from 'react';

type Props = { title: string; actionComponent?: JSX.Element };

export default function SectionTitle({ title, actionComponent }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      <Typography variant="h5">{title}</Typography>
      {actionComponent && actionComponent}
    </Box>
  );
}
