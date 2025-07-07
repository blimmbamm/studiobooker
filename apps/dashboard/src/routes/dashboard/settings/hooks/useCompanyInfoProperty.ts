import { useEditCompanyInfo } from '../../../../hooks/company.queries';
import { createUseProperty } from '../../../../hooks/useProperty';
import {
  CompanyInfo,
  EditCompanyInfoDto,
} from '../../../../types/company-info';

export const useCompanyInfoProperty = createUseProperty<
  EditCompanyInfoDto,
  CompanyInfo
>({ editMutation: (companyInfo) => useEditCompanyInfo(companyInfo.id) });
