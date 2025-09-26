import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import {
  Section,
  StaffStructured,
  ServiceCategoryForStaff,
  ServiceWithStaffQualification,
  ServicesList,
} from '@studiobooker/utils';

import StaffServicesSkeleton from './StaffServicesSkeleton';
import { useManageStaffServices } from '../../../../../hooks/queries/service.queries';
import { useStaffActivationValidation } from '../../../../../contexts/StaffActivationValidationContext';

type Props = {
  staff?: StaffStructured;
  sx?: SxProps;
};

export default function StaffServices({ staff, sx }: Props) {
  const manageStaffServicesMutation = useManageStaffServices();

  const { errorMessage, resetError } = useStaffActivationValidation();

  function CategorySelectionCheckbox({ services }: ServiceCategoryForStaff) {
    return services.every((s) => s.staffIsQualifiedForService) ? (
      <CheckBoxOutlinedIcon />
    ) : services.some((s) => s.staffIsQualifiedForService) ? (
      <IndeterminateCheckBoxOutlinedIcon />
    ) : (
      <CheckBoxOutlineBlankOutlinedIcon />
    );
  }

  function ServiceItemIcon(service: ServiceWithStaffQualification) {
    return service.staffIsQualifiedForService ? (
      <CheckBoxOutlinedIcon />
    ) : (
      <CheckBoxOutlineBlankOutlinedIcon />
    );
  }

  function handleToggleServiceSelection(
    staff: StaffStructured,
    service: ServiceWithStaffQualification
  ) {
    resetError('services');

    manageStaffServicesMutation.mutate({
      staffId: staff.id,
      select: !service.staffIsQualifiedForService,
      serviceId: service.id,
    });
  }

  return (
    <Section
      title="Services"
      sectionError={errorMessage('services')}
      contentBoxProps={{
        width: '100%',
        // width: 'fit-content',
        // minWidth: '75%',
      }}
      sx={sx}
    >
      {!staff && <StaffServicesSkeleton />}
      {staff && (
        <ServicesList
          serviceCategories={staff.serviceCategories}
          categoryAsItemButton
          expandOnSecondaryAction
          categoryItemIcon={CategorySelectionCheckbox}
          categoryIsDisabled={() => staff.activated}
          renderListItemContent={(service) => (
            <ListItem key={service.id} disablePadding>
              <ListItemButton
                onClick={() => handleToggleServiceSelection(staff, service)}
                disabled={staff.activated}
              >
                <ListItemIcon>{ServiceItemIcon(service)}</ListItemIcon>
                <ListItemText primary={service.title} />
              </ListItemButton>
            </ListItem>
          )}
        />
      )}
    </Section>
  );
}
