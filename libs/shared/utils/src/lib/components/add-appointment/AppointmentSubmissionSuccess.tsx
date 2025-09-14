import { Box, Typography } from '@mui/material';
import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';

type Props = {
  title: string;
  message: string;
} & AddAppointmentStepNavigationProps;

export default function AppointmentSubmissionSuccess({
  title,
  message,
  ...stepNavigationProps
}: Props) {
  return (
    <>
      <Box
        flex={1}
        textAlign={'center'}
        display={'flex'}
        flexDirection={'column'}
      >
        <Box flex={1} />
        <Typography variant="h5">{title}</Typography>
        <Typography>{message}</Typography>
        <Box flex={2} />
      </Box>
      <AddAppointmentStepNavigation {...stepNavigationProps} />
    </>
  );
}
