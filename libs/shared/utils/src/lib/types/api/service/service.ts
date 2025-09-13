import { ServiceCategory } from '../service-category/service-category';
import { StaffWithServiceQualification } from '../staff/staff';

/** Base Service type with only atomic fields */
export type Service = {
  id: number;
  title: string;
  description: string | null;
  duration: number | null;
  price: number | null;
  activated: boolean;
};

/** Service type with (some) relations */
export type ServiceStructured = Service & {
  staff: StaffWithServiceQualification[];
  serviceCategory: ServiceCategory;
};

/**
 * Service type with information if staff implements the service.
 *
 * This is used in ServiceCategoryForStaff > StaffStructured type.
 */
export type ServiceWithStaffQualification = Service & {
  staffIsQualifiedForService: boolean;
};

export type EditServiceDto = {
  title?: string;
  description?: string | null;
  duration?: number | null;
  price?: number | null;
  activated?: boolean;
};
