'use client';

import { Box, Typography } from '@mui/material';
import {
  AlertProvider,
  QueryClientProvider,
  StudioInformation,
} from '@studiobooker/utils';
import ServiceBooking from './ServiceBooking';

type Props = { studio: StudioInformation };

export default function StudioDetails({ studio }: Props) {
  return (
    <Box padding={4}>
      <Typography variant="h4" paddingTop={2}>
        {studio.name}
      </Typography>
      <Typography fontSize={'1.1rem'} paddingTop={2}>
        {studio.description}
      </Typography>
      <AlertProvider>
        <QueryClientProvider>
          <ServiceBooking studio={studio} />
        </QueryClientProvider>
      </AlertProvider>
    </Box>
  );
}
