import { Box, CircularProgress } from '@mui/material';

export default function CalendarLoadingOverlay() {
  return (
    <Box
      position={'absolute'}
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={3}
      bgcolor={'rgba(0,0,0,0.1)'}
    >
      <Box marginInline={'auto'} width={'40px'} marginTop={'20dvh'}>
        <CircularProgress sx={{ position: 'fixed' }} />
      </Box>
    </Box>
  );
}
