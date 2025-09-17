import { CompanyInfo, EditCompanyInfoDto } from '@studiobooker/utils';

import { useEditCompanyInfo } from '../../../../hooks/company.queries';
import { createUseProperty } from '../../../../hooks/useProperty';

export const useCompanyInfoProperty = createUseProperty<
  EditCompanyInfoDto,
  CompanyInfo
>({
  editMutation: ({ id }) =>
    useEditCompanyInfo({ id, withOptimisticUpdating: true }),
});
