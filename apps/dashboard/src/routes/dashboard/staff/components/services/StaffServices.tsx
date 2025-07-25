import { SxProps } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import { Section } from '@studiobooker/utils';
import { StaffStructured } from '../../../../../types/staff';
import { useManageStaffServices } from '../../../../../hooks/service.queries';
import StaffServicesSkeleton from './StaffServicesSkeleton';
import { ServiceCategoryForStaff } from '../../../../../types/service-category';
import { ServiceWithStaffQualification } from '../../../../../types/service';
import { ServicesList } from '../../../../../components/ServicesList';

type Props = {
  staff?: StaffStructured;
  sx?: SxProps;
};

export default function StaffServices({ staff, sx }: Props) {
  const manageStaffServicesMutation = useManageStaffServices();

  function categorySelectionCheckbox({ services }: ServiceCategoryForStaff) {
    return services.every((s) => s.staffIsQualifiedForService) ? (
      <CheckBoxOutlinedIcon />
    ) : services.some((s) => s.staffIsQualifiedForService) ? (
      <IndeterminateCheckBoxOutlinedIcon />
    ) : (
      <CheckBoxOutlineBlankOutlinedIcon />
    );
  }

  function serviceItemIcon(service: ServiceWithStaffQualification) {
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
    manageStaffServicesMutation.mutate({
      staffId: staff.id,
      select: !service.staffIsQualifiedForService,
      serviceId: service.id,
    });
  }

  return (
    <Section
      title="Services"
      contentBoxProps={{
        width: 'fit-content',
        minWidth: '75%',
      }}
      sx={sx}
    >
      {!staff && <StaffServicesSkeleton />}
      {staff && (
        <ServicesList
          serviceCategories={staff.serviceCategories}
          categoryAsItemButton={true}
          expandOnSecondaryAction
          categoryItemIcon={categorySelectionCheckbox}
          serviceItemIcon={serviceItemIcon}
          onClickService={(service) =>
            handleToggleServiceSelection(staff, service)
          }
        />
      )}
    </Section>
  );
}
