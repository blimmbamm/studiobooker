import {
  CompanyInfo,
  createUseProperty,
  EditCompanyInfoDto,
} from '@studiobooker/utils';

import { useEditCompanyInfo } from '../../../../hooks/queries/company.queries';

export const useCompanyInfoProperty = createUseProperty<
  EditCompanyInfoDto,
  CompanyInfo
>({
  editMutation: ({ id }) =>
    useEditCompanyInfo({ id, withOptimisticUpdating: true }),
});
