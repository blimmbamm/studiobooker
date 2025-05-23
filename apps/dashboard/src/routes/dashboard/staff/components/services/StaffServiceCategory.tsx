import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ServiceCategoryForStaff } from '../../../../../types/service-category';

export default function StaffServiceCategory(props: {
  serviceCategory: ServiceCategoryForStaff;
  onToggleService: (id: number, select: boolean) => void;
}) {
  const {
    serviceCategory: { name, services },
  } = props;

  const categorySelectionCheckbox = services.every(
    (s) => s.staffIsQualifiedForService
  ) ? (
    <CheckBoxOutlinedIcon />
  ) : services.some((s) => s.staffIsQualifiedForService) ? (
    <IndeterminateCheckBoxOutlinedIcon />
  ) : (
    <CheckBoxOutlineBlankOutlinedIcon />
  );

  const [open, setOpen] = useState(false);

  function handleToggleService(id: number, select: boolean) {
    props.onToggleService(id, select);
  }

  function handleToggleCategory() {}

  function handleExpand(event: MouseEvent) {
    event.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  }
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleToggleCategory}>
          <ListItemIcon>{categorySelectionCheckbox}</ListItemIcon>
          <ListItemText primary={name} />
          <IconButton onClick={handleExpand}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding>
          {services.map((s) => (
            <ListItem key={s.id} disablePadding>
              <ListItemButton
                onClick={() =>
                  handleToggleService(s.id, !s.staffIsQualifiedForService)
                }
              >
                <ListItemIcon>
                  {s.staffIsQualifiedForService ? (
                    <CheckBoxOutlinedIcon />
                  ) : (
                    <CheckBoxOutlineBlankOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={s.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
