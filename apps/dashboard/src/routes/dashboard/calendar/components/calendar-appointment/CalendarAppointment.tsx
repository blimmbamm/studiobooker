import { Box, ButtonBase, Typography } from '@mui/material';
import { Appointment } from '../../../../../types/appointment';
import { useStaffColors } from '../../contexts/StaffColorContext';
import { Staff } from '../../../../../types/staff';

type Props = { staff: Staff; appointment: Appointment };

export default function CalendarAppointment({ staff, appointment }: Props) {
  const staffColorMap = useStaffColors();

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
          bgcolor: staffColorMap[staff.id],
          borderRadius: 1.5,
          p: 0.5,
          overflow: 'hidden',
          display: 'block',
        }}
      >
        <Typography noWrap fontSize={'0.8rem'}>
          {appointment.title}
        </Typography>
        <Typography noWrap fontStyle={'italic'} fontSize={'0.8rem'}>
          {appointment.customer}
        </Typography>
      </ButtonBase>
    </Box>
  );
}
