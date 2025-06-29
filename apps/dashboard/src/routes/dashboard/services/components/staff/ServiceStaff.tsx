import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { Section } from '@studiobooker/utils';
import { ServiceStructured } from '../../../../../types/service';
import { useManageServiceStaff } from '../../../../../hooks/service.queries';

type Props = {
  service?: ServiceStructured;
};

export default function ServiceStaff({ service }: Props) {
  const { mutate } = useManageServiceStaff();

  return (
    <Section
      title="Staff"
      contentBoxProps={{
        width: 'fit-content',
        minWidth: '75%',
        maxWidth: '100%',
      }}
    >
      {!service && <p>Skeleton</p>}
      {service && (
        <List dense disablePadding sx={{ backgroundColor: grey[100] }}>
          {service.staff.map((s) => (
            <ListItem key={s.id} disablePadding>
              <ListItemButton
                onClick={() =>
                  mutate({
                    serviceId: service.id,
                    staffId: s.id,
                    select: !s.staffIsQualifiedForService,
                  })
                }
              >
                <ListItemIcon>
                  {s.staffIsQualifiedForService ? (
                    <CheckBoxOutlinedIcon />
                  ) : (
                    <CheckBoxOutlineBlankOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={s.name}
                  slotProps={{ primary: { noWrap: true } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Section>
  );
}
