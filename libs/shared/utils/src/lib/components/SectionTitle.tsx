import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { JSX } from 'react';

type Props = {
  title: string;
  actionComponent?: JSX.Element;
  sectionError?: string;
};

export default function SectionTitle({
  title,
  actionComponent,
  sectionError,
}: Props) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      <Box>
        <Typography variant="h5">{title}</Typography>
        {sectionError && (
          <Typography variant="caption" color="error">
            {sectionError}
          </Typography>
        )}
      </Box>
      {actionComponent && actionComponent}
    </Box>
  );
}
