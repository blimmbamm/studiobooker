import {
  useMutation,
  useQuery,
  useQueryClient,
  editCompanyInfo,
  getCompany,
  EditCompanyInfoDto,
  CompanyStructured,
} from '@studiobooker/utils';

export const CompanyQueryKeys = {
  COMPANY_STRUCTURED: ['company'],
};

export function useCompany() {
  const { data: company, ...query } = useQuery({
    queryKey: CompanyQueryKeys.COMPANY_STRUCTURED,
    queryFn: getCompany,
  });

  return { ...query, company };
}

type UseEditCompanyInfoParams = {
  id: number;
  withOptimisticUpdating?: boolean;
};

export function useEditCompanyInfo({
  id,
  withOptimisticUpdating = false,
}: UseEditCompanyInfoParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ input }: { input: EditCompanyInfoDto }) =>
      editCompanyInfo(id, input),
    onMutate: ({ input }) => {
      if (withOptimisticUpdating) {
        // optimistic update for company query
        // Actually, also this optimistic updating is unnecessary if only used for company info that is edited via TextField
        const queryKey = CompanyQueryKeys.COMPANY_STRUCTURED;
        queryClient.cancelQueries({ queryKey });

        const prevCompany =
          queryClient.getQueryData<CompanyStructured>(queryKey);

        queryClient.setQueryData<CompanyStructured>(queryKey, (data) => {
          if (!data) return data;

          const newData = structuredClone(data);
          newData.companyInfo = { ...newData.companyInfo, ...input };
          return newData;
        });
        return { prevCompany, queryKey };
      } else {
        return;
      }
    },
    onError: (_e, _v, context) => {
      if (context) {
        queryClient.setQueryData(context.queryKey, context.prevCompany);
      }
    },
    onSuccess: (_d, _v, { queryKey }) => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
