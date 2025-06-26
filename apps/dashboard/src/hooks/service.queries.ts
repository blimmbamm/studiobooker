import { useQueryClient } from '@tanstack/react-query';

import { useQuery, useMutation } from '@studiobooker/utils';
import {
  addStaffToService,
  editService,
  getService,
  getServicesByCategory,
  removeStaffFromService,
} from '../api/service.api';
import { StaffStructured } from '../types/staff';
import { EditServiceDto } from '../types/service';

export function useServicesByCategory() {
  const query = useQuery({
    queryKey: ['services-by-category'],
    queryFn: () => getServicesByCategory(),
  });

  return {
    ...query,
    serviceCategories: query.data,
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
