import {
  Service,
  ServiceStructured,
  ServiceWithStaffQualification,
} from '../service';
import {
  ApiService,
  ApiServiceStructured,
  ApiServiceWithStaffQualification,
} from './service';
import { mapApiToServiceCategory } from './service-category.mapper';
import { mapApiToStaffWithServiceQualification } from './staff.mapper';

export function mapApiToService(service: ApiService): Service {
  return { ...service };
}

export function mapApiToServiceWithStaffQualification(
  service: ApiServiceWithStaffQualification
): ServiceWithStaffQualification {
  return {
    ...mapApiToService(service),
    staffIsQualifiedForService: service.staffIsQualifiedForService,
  };
}

export function mapApiToServiceStructured(
  data: ApiServiceStructured
): ServiceStructured {
  return {
    ...data,
    staff: data.personnel.map((p) => mapApiToStaffWithServiceQualification(p)),
    serviceCategory: mapApiToServiceCategory(data.serviceCategory),
  };
}
