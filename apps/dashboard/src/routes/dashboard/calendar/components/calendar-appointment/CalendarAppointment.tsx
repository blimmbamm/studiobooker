import { Box, ButtonBase, SxProps, Typography } from '@mui/material';
import {
  Appointment,
  AppointmentStatus,
} from '../../../../../types/appointment';
import { useStaffColors } from '../../contexts/StaffColorContext';
import { Staff } from '../../../../../types/staff';

type Props = { staff: Staff; appointment: Appointment; onClick: () => void };

export default function CalendarAppointment({
  staff,
  appointment,
  onClick,
}: Props) {
  const staffColorMap = useStaffColors();

  const staffColor = staffColorMap[staff.id];

  const appointmentBackgroundSx: () => SxProps | undefined = () => {
    switch (appointment.status) {
      case AppointmentStatus.CONFIRMED:
        return { bgcolor: staffColor };
      case AppointmentStatus.PENDING:
        return {
          backgroundImage: `repeating-linear-gradient(
          -45deg,
          ${staffColor}CC,
          ${staffColor}CC 5px,
          ${staffColor} 5px,
          ${staffColor} 10px
        )`,
        };
      default:
        return undefined;
    }
  };

  return (
    <Box
      key={appointment.id}
      position="absolute"
      top={appointment.startNum}
      width={'100%'}
      height={appointment.duration - 1}
      paddingBlock={'1.5px'}
    >
      <ButtonBase
        component="div"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 1.5,
          p: 0.5,
          overflow: 'hidden',
          display: 'block',
          ...appointmentBackgroundSx(),
        }}
        onClick={onClick}
      >
        <Typography noWrap fontSize={'0.8rem'} fontWeight={'bold'}>
          {appointment.title}
        </Typography>
        <Typography noWrap fontStyle={'italic'} fontSize={'0.8rem'}>
          {appointment.customer}
        </Typography>
      </ButtonBase>
    </Box>
  );
}
