import { EditServiceDto, Service } from '@studiobooker/utils';

import { useEditService } from '../../../../hooks/service.queries';
import { createUseProperty } from '../../../../hooks/useProperty';

export const useServiceProperty = createUseProperty<EditServiceDto, Service>({
  editMutation: (service) => useEditService({ serviceId: service.id }),
});
