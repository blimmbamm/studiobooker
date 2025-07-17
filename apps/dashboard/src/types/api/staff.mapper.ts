import {
  Staff,
  StaffStructured,
  StaffWithAppointments,
  StaffWithServiceQualification,
} from '../staff';
import { mapApiToAppointment } from './appointment.mapper';
import { mapApiToServiceCategory } from './service-category.mapper';
import { mapApiToService } from './service.mapper';
import {
  ApiStaff,
  ApiStaffStructured,
  ApiStaffWithAppointments,
  ApiStaffWithServiceQualification,
} from './staff';
import { mapApiToWorkingTime } from './working-time.mapper';

export function mapApiToStaff(data: ApiStaff): Staff {
  return data;
}

export function mapApiToStaffWithServiceQualification(
  data: ApiStaffWithServiceQualification
): StaffWithServiceQualification {
  return {
    ...mapApiToStaff(data),
    staffIsQualifiedForService: data.staffIsQualifiedForService,
  };
}

export function mapApiToStaffStructured(
  data: ApiStaffStructured
): StaffStructured {
  return {
    ...data,
    workingTimes: data.workingTimes.map((wt) => mapApiToWorkingTime(wt)),
    serviceCategories: data.serviceCategories.map((sc) => ({
      ...mapApiToServiceCategory(sc),
      services: sc.services.map((s) => ({ ...s, ...mapApiToService(s) })),
    })),
  };
}

export function mapApiToStaffWithAppointments(
  data: ApiStaffWithAppointments
): StaffWithAppointments {
  return {
    ...mapApiToStaff(data),
    appointments: data.appointments.map(mapApiToAppointment),
  };
}
