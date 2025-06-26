import { useEditService } from '../../../../hooks/service.queries';
import { EditServiceDto, Service } from '../../../../types/service';
import { createUseProperty } from '../../../../hooks/useProperty';

export const useServiceProperty = createUseProperty<EditServiceDto, Service>({
  editMutation: (service) => useEditService({ serviceId: service.id }),
});
