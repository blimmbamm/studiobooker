import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { ListSkeleton, Section } from '@studiobooker/utils';
import { Service, ServiceStructured } from '../../../../../types/service';
import { useManageServiceStaff } from '../../../../../hooks/service.queries';
import StaffList from '../../../../../components/StaffList';
import { StaffWithServiceQualification } from '../../../../../types/staff';

type Props = {
  service?: ServiceStructured;
};

export default function ServiceStaff({ service }: Props) {
  const { mutate } = useManageServiceStaff();

  function staffItemIcon(staff: StaffWithServiceQualification) {
    return staff.staffIsQualifiedForService ? (
      <CheckBoxOutlinedIcon />
    ) : (
      <CheckBoxOutlineBlankOutlinedIcon />
    );
  }

  function handleToggleStaffQualification(
    service: Service,
    staff: StaffWithServiceQualification
  ) {
    mutate({
      serviceId: service.id,
      staffId: staff.id,
      select: !staff.staffIsQualifiedForService,
    });
  }

  return (
    <Section
      title="Staff"
      contentBoxProps={{
        width: 'fit-content',
        minWidth: '75%',
        maxWidth: '100%',
      }}
    >
      {!service && <ListSkeleton />}
      {service && (
        <StaffList
          staff={service.staff}
          staffItemIcon={staffItemIcon}
          onClickStaff={(staff) =>
            handleToggleStaffQualification(service, staff)
          }
        />
      )}
    </Section>
  );
}
