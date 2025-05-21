import { Service, ServiceWithStaffQualification } from '../service';
import { ApiService, ApiServiceWithStaffQualification } from './service';

export function mapApiToService(service: ApiService): Service {
  return { ...service, dingens: false };
}

export function mapApiToServiceWithStaffQualification(
  service: ApiServiceWithStaffQualification
): ServiceWithStaffQualification {
  return {
    ...mapApiToService(service),
    staffIsQualifiedForService: service.staffIsQualifiedForService,
  };
}
