import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addStaffToService,
  getServicesByCategory,
  removeStaffFromService,
} from '../api/service.api';
import { StaffStructured } from '../types/staff';

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

export function useManageStaffServices({ staffId }: { staffId: number }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      select,
      serviceId,
    }: {
      select: boolean;
      serviceId: number;
    }) =>
      select
        ? addStaffToService(serviceId, staffId)
        : removeStaffFromService(serviceId, staffId),
    onMutate: ({ select, serviceId }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
    },
    onError: (_error, _variables, context) => {
      // Todo: Add Toast with error message
      queryClient.setQueryData(['staff', staffId], context?.prevStaff);
    },
  });
}
