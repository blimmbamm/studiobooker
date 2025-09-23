import {
  createUseProperty,
  EditServiceDto,
  Service,
} from '@studiobooker/utils';

import { useEditService } from '../../../../hooks/queries/service.queries';

export const useServiceProperty = createUseProperty<EditServiceDto, Service>({
  editMutation: (service) => useEditService({ serviceId: service.id }),
});
