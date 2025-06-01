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
import { grey, red } from '@mui/material/colors';

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
    // event.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  }

  // Ok, don't know why, but 8.5 (and fractions, at least partially) is making the pattern seamless from one listitem to another:
  // const x = 8.5/3;
  const x = 8.5;

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton onClick={handleExpand}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        sx={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            ${grey[100]},
            ${grey[100]} ${x}px,
            ${red[100]} ${x}px,
            ${red[100]} ${2 * x}px
          )`,
        }}
      >
        <ListItemButton onClick={handleToggleCategory}>
          <ListItemIcon>{categorySelectionCheckbox}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <List disablePadding sx={{ backgroundColor: grey[100] }}>
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
