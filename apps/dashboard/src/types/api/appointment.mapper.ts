import dayjs from 'dayjs';
import { Appointment } from '../appointment';
import { ApiAppointment } from './appointment';

export function mapApiToAppointment(data: ApiAppointment): Appointment {
  const start = dayjs(data.start);
  return {
    ...data,
    startNum: start.hour() * 60 + start.minute(),
    start,
    end: start.add(data.duration, 'minutes'),
  };
}
