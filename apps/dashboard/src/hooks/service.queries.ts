import { useQueryClient } from '@tanstack/react-query';

import { useQuery, useMutation } from '@studiobooker/utils';
import {
  addStaffToService,
  editService,
  editServiceServiceCategory,
  getService,
  getServicesByCategory,
  removeStaffFromService,
} from '../api/service.api';
import { StaffStructured } from '../types/staff';
import { EditServiceDto, Service, ServiceStructured } from '../types/service';
import { ServiceCategoryStructured } from '../types/service-category';

export const ServiceQueryKeys = {
  SERVICE_ALL: ['service'],
  SERVICES_BY_CATEGORY: ['service', 'all by category'],
  SERVICE_DETAIL: (id: number) => ['service', id],
};

export function useServicesByCategory() {
  const { data: serviceCategories, ...query } = useQuery({
    queryKey: ['service', 'all by category'],
    queryFn: () => getServicesByCategory(),
  });

  return {
    ...query,
    serviceCategories,
  };
}

export function useService(id?: number) {
  const { data: service, ...query } = useQuery({
    queryKey: ['service', id],
    queryFn: () => getService(id!),
    enabled: !!id,
  });

  return {
    ...query,
    service,
  };
}

export function useManageStaffServices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      staffId,
      select,
      serviceId,
    }: {
      staffId: number;
      select: boolean;
      serviceId: number;
    }) =>
      select
        ? addStaffToService(serviceId, staffId)
        : removeStaffFromService(serviceId, staffId),
    onMutate: ({ staffId, select, serviceId }) => {
      queryClient.cancelQueries({ queryKey: ['staff', staffId] });

      const prevStaff = queryClient.getQueryData<StaffStructured>([
        'staff',
        staffId,
      ]);

      queryClient.setQueryData<StaffStructured>(['staff', staffId], (data) => {
        if (!data) return data;

        const newData: StaffStructured = {
          ...data,
          serviceCategories: data.serviceCategories.map((category) => ({
            ...category,
            services: category.services.map((service) =>
              service.id === serviceId
                ? { ...service, staffIsQualifiedForService: select }
                : service
            ),
          })),
        };

        return newData;
      });
      return { prevStaff };
    },
    onSuccess: (_, { staffId }) => {
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
    },
    onError: (_error, { staffId }, context) => {
      queryClient.setQueryData(['staff', staffId], context?.prevStaff);
    },
  });
}

export function useEditService(args: {
  serviceId: number;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { input: EditServiceDto }) =>
      editService(args.serviceId, variables.input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service'] });
      args.onSuccess?.();
    },
    onError: () => {
      args.onError?.();
    },
  });
}

export function useEditServiceServiceCategory(args?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      serviceId,
      serviceCategoryId,
    }: {
      serviceId: number;
      serviceCategoryId: number;
    }) => editServiceServiceCategory(serviceId, serviceCategoryId),
    onMutate: ({ serviceId, serviceCategoryId }) => {
      queryClient.cancelQueries({
        queryKey: ServiceQueryKeys.SERVICE_DETAIL(serviceId),
      });
      queryClient.cancelQueries({
        queryKey: ServiceQueryKeys.SERVICES_BY_CATEGORY,
      });

      const prevData = {
        prevService: queryClient.getQueryData<ServiceStructured>(
          ServiceQueryKeys.SERVICE_DETAIL(serviceId)
        ),
        prevServiceCategories: queryClient.getQueryData<
          ServiceCategoryStructured[]
        >(ServiceQueryKeys.SERVICES_BY_CATEGORY),
      };

      const newServiceCategory = queryClient
        .getQueryData<ServiceCategoryStructured[]>(
          ServiceQueryKeys.SERVICES_BY_CATEGORY
        )
        ?.find((c) => c.id === serviceCategoryId);

      if (newServiceCategory) {
        queryClient.setQueryData<ServiceStructured>(
          ServiceQueryKeys.SERVICE_DETAIL(serviceId),
          (data) => {
            if (!data) return data;

            const newData: ServiceStructured = {
              ...data,
              serviceCategory: newServiceCategory,
            };

            return newData;
          }
        );
      }

      queryClient.setQueryData<ServiceCategoryStructured[]>(
        ServiceQueryKeys.SERVICES_BY_CATEGORY,
        (data) => {
          if (!data) return data;

          // Remove service from current category,
          // add service to new category,
          // return updated categories + remaining categories untouched
          const newData: ServiceCategoryStructured[] = structuredClone(data);

          let serviceToMove: Service | null = null;

          // Remove from previous category
          for (const category of newData) {
            const service = category.services.find((s) => s.id === serviceId);

            if (!service) {
              continue;
            } else {
              serviceToMove = service;
              category.services = category.services.filter(
                (s) => s.id !== serviceToMove?.id
              );
              break;
            }
          }

          // Add to new category:
          if (serviceToMove) {
            newData
              .find((sc) => sc.id === serviceCategoryId)
              ?.services.push(serviceToMove);
          }

          return newData;
        }
      );

      return prevData;
    },
    onError: (_, { serviceId }, context) => {
      queryClient.setQueryData(
        ServiceQueryKeys.SERVICE_DETAIL(serviceId),
        context?.prevService
      );
      queryClient.setQueryData(
        ServiceQueryKeys.SERVICES_BY_CATEGORY,
        context?.prevServiceCategories
      );
      args?.onError?.();
    },
    onSuccess: (_, { serviceId }) => {
      queryClient.invalidateQueries({
        queryKey: ServiceQueryKeys.SERVICE_DETAIL(serviceId),
      });
      queryClient.invalidateQueries({
        queryKey: ServiceQueryKeys.SERVICES_BY_CATEGORY,
      });
      args?.onSuccess?.();
    },
  });
}
