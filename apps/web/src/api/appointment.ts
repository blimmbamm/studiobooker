import {
  AddAppointmentDto,
  ApiAppointment,
  ApiAvailableAppointmentSlots,
  mapApiToAppointment,
  mapApiToAvailableAppointmentSlots,
} from '@studiobooker/utils';
import { client } from './client';

export async function getAvailableAppointmentSlots(args: {
  companyId: number;
  serviceId: number;
  staffId: number;
  start: Date;
}) {
  const slots = await client.post<ApiAvailableAppointmentSlots[]>(
    'public/available-appointment-slots',
    args
  );
  return slots.map(mapApiToAvailableAppointmentSlots);
}

export async function addAppointment(
  args: AddAppointmentDto & { companyId: number }
) {
  const appointment = await client.post<ApiAppointment>(
    'public/appointment',
    args,
    2000
  );

  return mapApiToAppointment(appointment);
}
