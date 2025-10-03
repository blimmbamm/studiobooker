'use client';

import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import {
  ServicesList,
  Service,
  AddAppointmentForServiceDialog,
  useQuery,
  StudioInformation,
  createUseAvailableAppointmentSlots,
  useMutation,
  AppointmentData,
  getStaffByServicePublic,
  getAvailableAppointmentSlotsPublic,
  addAppointmentPublic,
  initClient,
} from '@studiobooker/utils';
import { useState } from 'react';

import {
  AddAppointmentDto,
  AppointmentStatus,
} from '../../../../libs/shared/utils/src/lib/types/api/appointment/appointment';

type Props = {
  studio: StudioInformation;
};

initClient(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/');

export default function ServiceBooking({
  studio: { companyId, services },
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  function staffByServiceQuery(service: Service) {
    const { data: staff, ...query } = useQuery({
      queryKey: ['service-staff', service.id],
      queryFn: () => {
        return getStaffByServicePublic({ companyId, serviceId: service.id });
      },
      // staleTime: 1000 * 60 * 5, // If staleTime is 0, staff gets refetched when re-opening the dialog because query gets newly subscribed
    });

    return {
      staff,
      noStaff: staff?.length === 0,
      ...query,
    };
  }

  // Maybe useMemo this:
  const availableAppointmentSlotsQuery = createUseAvailableAppointmentSlots({
    queryKey: ({ service, staff, start }) => [
      'appointment-slots',
      service,
      staff,
      start.format('YYYY-MM-DD'),
    ],
    queryFn: ({ service, staff, start }) =>
      getAvailableAppointmentSlotsPublic({
        companyId,
        serviceId: service.id,
        staffId: staff.id,
        start: start.toDate(),
      }),
  });

  const { mutate, isPending: isSubmittingAppointment } = useMutation({
    mutationFn: (dto: AddAppointmentDto) =>
      addAppointmentPublic({ companyId, ...dto }),
  });

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
    // This duration check is kind of ugly, but okay..
    if (duration) {
      mutate(
        {
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
        {
          onSuccess,
        }
      );
    }
  }

  return (
    <>
      <Typography variant="h5" paddingTop={3} paddingBottom={1}>
        Our services
      </Typography>
      <ServicesList
        serviceCategories={services}
        onCollapseCategory={() => setSelectedService(null)}
        renderListItemContent={(s) =>
          s === selectedService ? (
            <ListItem
              key={s.id}
              sx={(theme) => ({
                display: 'block',
                backgroundColor: theme.palette.primary.light,
              })}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography>{s.title}</Typography>
                <Typography>{`${s.duration} min | EUR ${s.price},-`}</Typography>
              </Box>
              <Box display={'flex'} paddingTop={1}>
                <Typography>{s.description}</Typography>
                <Box flex={1} />
                <Button variant="contained" onClick={() => setDialogOpen(true)}>
                  Book appointment
                </Button>
              </Box>
            </ListItem>
          ) : (
            <ListItem key={s.id} disablePadding>
              <ListItemButton
                onClick={() => setSelectedService(s)}
                sx={{ justifyContent: 'space-between' }}
              >
                <Typography>{s.title}</Typography>
                <Typography>{`${s.duration} min | EUR ${s.price},-`}</Typography>
              </ListItemButton>
            </ListItem>
          )
        }
      />
      {selectedService && (
        <AddAppointmentForServiceDialog
          servicesByCategoryQuery={() => ({ serviceCategories: services })}
          staffQuery={staffByServiceQuery}
          availableAppointmentSlotsQuery={availableAppointmentSlotsQuery}
          onAddAppointment={handleAddAppointment}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          isSubmittingAppointment={isSubmittingAppointment}
          initialStep={1}
          initialService={selectedService}
          stepFilter={(label) => label !== 'Service'}
          withSuccessStep
        />
      )}
    </>
  );
}
