import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ConfirmDialog, PropertiesTableProperty } from '@studiobooker/utils';
import { Appointment } from '../../../../../types/appointment';
import { useCancelAppointment } from '../../../../../hooks/appointment.queries';

type Props = { appointment: Appointment | null; onClose: () => void };

export default function AppointmentDetailsDialog({
  appointment,
  onClose,
}: Props) {
  // TODO: The handler could be moved into the useCancelAppointment hook...
  const { mutate } = useCancelAppointment();

  function handleCancelAppointment(appointment: Appointment) {
    mutate({
      id: appointment.id,
    });
  }

  if (!appointment) return null;

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
        <ConfirmDialog
          triggerComponent={Button}
          triggerProps={{ variant: 'contained' }}
          dialogTitle="Cancel appointment?"
          dialogMessage={
            appointment.customer
              ? `Cancelling the appointment will send a notification 
                to the customer. Continue?`
              : `Appointment will be removed from calendar. Continue?`
          }
          onConfirm={() => handleCancelAppointment(appointment)}
        >
          Cancel appointment
        </ConfirmDialog>
        <Button variant="contained" disabled>
          Create follow-up
        </Button>
      </Box>
    </Dialog>
  );
}
