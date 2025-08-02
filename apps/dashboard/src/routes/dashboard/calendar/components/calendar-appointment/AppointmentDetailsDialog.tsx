import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Appointment } from '../../../../../types/appointment';
import { PropertiesTableProperty } from '@studiobooker/utils';

type Props = { appointment: Appointment | null; onClose: () => void };

export default function AppointmentDetailsDialog({
  appointment,
  onClose,
}: Props) {
  if (!appointment) return null;
  console.log(appointment);

  return (
    <Dialog
      open
      onClose={onClose}
      slotProps={{ paper: { sx: { padding: 2 } } }}
      fullWidth
      maxWidth={'sm'}
    >
      <Box
        display={'flex'}
        alignItems={'start'}
        justifyContent={'space-between'}
        gap={1}
      >
        <Box>
          <Typography fontStyle={'italic'}>
            {appointment.personnel?.name}
          </Typography>
          <Typography fontSize={'1.5rem'}>{appointment.title}</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display={'grid'}
        gridTemplateColumns={'auto auto'}
        alignItems={'Center'}
        rowGap={1}
        columnGap={3}
        width={'fit-content'}
        overflow={'auto'}
        paddingBlock={2}
        paddingInline={1}
      >
        <PropertiesTableProperty
          asTextField={false}
          name="Date"
          propertyValue={appointment.start.format('MMM DD, YYYY')}
        />
        <PropertiesTableProperty
          asTextField={false}
          name="Start"
          propertyValue={appointment.start.format('HH:mm')}
        />
        <PropertiesTableProperty
          asTextField={false}
          name="End"
          propertyValue={appointment.end.format('HH:mm')}
        />
        <PropertiesTableProperty
          asTextField={false}
          name="Customer"
          propertyValue={appointment.customer || ''}
        />
        <PropertiesTableProperty
          asTextField={false}
          name="Notes"
          propertyValue={appointment.notes || ''}
        />
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <Button variant="contained">Cancel appointment</Button>
        <Button variant="contained">Create follow-up</Button>
      </Box>
    </Dialog>
  );
}
