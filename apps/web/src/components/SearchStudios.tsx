import { Box, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function SearchStudios() {
  return (
    <Box textAlign={'center'}>
      <Typography fontSize={'1.2rem'} paddingBottom={1}>
        Find studios in your region
      </Typography>
      <Tooltip title="Yet to be implemented!">
        <TextField
          sx={{ width: '70%' }}
          slotProps={{
            input: { sx: { borderRadius: 9999, backgroundColor: grey[100] } },
          }}
          size="small"
          fullWidth
          disabled
        />
      </Tooltip>
    </Box>
  );
}
