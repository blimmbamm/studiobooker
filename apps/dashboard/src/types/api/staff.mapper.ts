import { Staff, StaffStructured } from '../staff';
import { mapApiToServiceCategory } from './service-category.mapper';
import { mapApiToService } from './service.mapper';
import { ApiStaff, ApiStaffStructured } from './staff';
import { mapApiToWorkingTime } from './working-time.mapper';

export function mapApiToStaff(data: ApiStaff): Staff {
  return data;
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
