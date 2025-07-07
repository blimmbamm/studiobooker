import { useMutation, useQuery } from '@studiobooker/utils';
import { editCompanyInfo, getCompany } from '../api/company.api';
import { EditCompanyInfoDto } from '../types/company-info';

export function useCompany() {
  const { data: company, ...query } = useQuery({
    queryKey: ['company'],
    queryFn: getCompany,
  });

  return { ...query, company };
}

export function useEditCompanyInfo(id: number) {
  return useMutation({
    mutationFn: ({ input }: { input: EditCompanyInfoDto }) =>
      editCompanyInfo(id, input),
  });
}
