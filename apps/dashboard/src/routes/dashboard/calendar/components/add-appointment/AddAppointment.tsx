import { Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MouseEvent, useState } from 'react';

import {
  AddAppointmentForServiceDialog,
  AppointmentData,
  AppointmentStatus,
} from '@studiobooker/utils';

import { useServicesByCategory } from '../../../../../hooks/queries/service.queries';
import { useAllStaff } from '../../../../../hooks/queries/staff.queries';
import { useAvailableAppointmentSlots } from '../../hooks/useAvailableAppointmentSlots';
import { useAddAppointment } from '../../../../../hooks/queries/appointment.queries';

export default function AddAppointment() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  function handleCloseMenu() {
    setMenuAnchor(null);
  }

  function handleOpenDialog() {
    handleCloseMenu();
    setDialogOpen(true);
  }

  const { mutate, isPending: isSubmittingAppointment } = useAddAppointment({});

  function handleAddAppointment({
    appointmentData: {
      date: start,
      service: { duration, title, id: serviceId },
      staff: { id: staffId },
      notes,
      customerEmail,
      customerName,
    },
    onSuccess,
  }: {
    appointmentData: AppointmentData;
    onSuccess?: () => void;
  }) {
    if (duration) {
      mutate(
        {
          dto: {
            start,
            duration,
            status: AppointmentStatus.PENDING,
            title: `Appt: ${title}`,
            notes,
            customerName,
            customerEmail,
            serviceId,
            staffId,
          },
        },
        {
          onSuccess,
        }
      );
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        endIcon={<AddIcon />}
        onClick={(e: MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget)}
      >
        Add
      </Button>
      <Menu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenDialog}>Service appointment</MenuItem>
        <MenuItem disabled>Other appointment</MenuItem>
      </Menu>
      <AddAppointmentForServiceDialog
        open={dialogOpen}
        servicesByCategoryQuery={() => useServicesByCategory(true)}
        staffQuery={(service) =>
          useAllStaff({
            serviceId: service.id,
            activated: true,
          })
        }
        availableAppointmentSlotsQuery={({ service, staff, start }) =>
          useAvailableAppointmentSlots({
            service,
            staff,
            date: start,
          })
        }
        onClose={() => setDialogOpen(false)}
        isSubmittingAppointment={isSubmittingAppointment}
        onAddAppointment={handleAddAppointment}
        withSuccessStep={false}
      />
      {/* <AddCustomAppointmentDialog /> */}
    </>
  );
}
