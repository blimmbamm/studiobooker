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
    <Box>
      <Typography>{studio.name}</Typography>
      <Typography>{studio.description}</Typography>
      <AlertProvider>
        <QueryClientProvider>
          <ServiceBooking studio={studio} />
        </QueryClientProvider>
      </AlertProvider>
    </Box>
  );
}
