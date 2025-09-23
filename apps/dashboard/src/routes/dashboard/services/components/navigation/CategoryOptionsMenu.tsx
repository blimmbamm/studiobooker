import { useState } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { ServiceCategory } from '@studiobooker/utils';

import RenameCategory from './RenameCategory';
import RemoveCategory from './RemoveCategory';

type Props = {
  category: ServiceCategory;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

export default function CategoryOptionsMenu({
  category,
  anchorEl,
  handleClose,
}: Props) {
  const [menuVisibility, setMenuVisibility] = useState<'visible' | 'hidden'>(
    'visible'
  );

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handleClose}
      elevation={5}
      slotProps={{
        paper: {
          sx: {
            visibility: menuVisibility,
            backgroundColor: grey.A100,
          },
        },
      }}
    >
      <RenameCategory
        component={MenuItem}
        category={category}
        onOpenDialog={() => {
          setMenuVisibility('hidden');
        }}
        onCloseDialog={handleClose}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Rename</ListItemText>
      </RenameCategory>
      <RemoveCategory
        category={category}
        component={MenuItem}
        onOpenDialog={() => setMenuVisibility('hidden')}
        onCloseDialog={handleClose}
        componentProps={{}}
      >
        <ListItemIcon>
          <DeleteOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Remove</ListItemText>
      </RemoveCategory>
    </Menu>
  );
}
