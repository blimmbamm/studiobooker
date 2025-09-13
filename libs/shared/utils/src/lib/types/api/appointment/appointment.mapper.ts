import dayjs from 'dayjs';
import { Appointment } from './appointment';
import { ApiAppointment } from './appointment.api';
import { mapApiToStaff } from '../staff/staff.mapper';
import { mapApiToService } from '../service/service.mapper';

export function mapApiToAppointment(data: ApiAppointment): Appointment {
  const start = dayjs(data.start);
  return {
    ...data,
    startNum: start.hour() * 60 + start.minute(),
    start,
    end: start.add(data.duration, 'minutes'),
    personnel: data.personnel && mapApiToStaff(data.personnel),
    service: data.service && mapApiToService(data.service),
  };
}
