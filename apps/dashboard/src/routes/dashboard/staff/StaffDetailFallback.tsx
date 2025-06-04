import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = { message: string };

export default function StaffDetailFallback({ message }: Props) {
  return (
    <Typography marginTop={'10dvh'} textAlign="center" variant="h6" color={grey[600]}>
      {message}
    </Typography>
  );
}
