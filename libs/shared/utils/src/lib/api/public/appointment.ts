import { getClient } from '../../http';
import {
  AddAppointmentDto,
  ApiAppointment,
  ApiAvailableAppointmentSlots,
  mapApiToAppointment,
  mapApiToAvailableAppointmentSlots,
} from '../../types';

export async function getAvailableAppointmentSlotsPublic(args: {
  companyId: number;
  serviceId: number;
  staffId: number;
  start: Date;
}) {
  const slots = await getClient().post<ApiAvailableAppointmentSlots[]>(
    'public/available-appointment-slots',
    args
  );
  return slots.map(mapApiToAvailableAppointmentSlots);
}

export async function addAppointmentPublic(
  args: AddAppointmentDto & { companyId: number }
) {
  const appointment = await getClient().post<ApiAppointment>(
    'public/appointment',
    args,
    1500
  );

  return mapApiToAppointment(appointment);
}
