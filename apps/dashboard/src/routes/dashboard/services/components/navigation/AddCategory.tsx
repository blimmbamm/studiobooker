import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { SingleInputDialog } from '@studiobooker/utils';

import { useAddCategory } from '../../../../../hooks/service.queries';

export default function AddCategory() {
  const { mutate, error, isError, isPending, isSuccess, reset } =
    useAddCategory();

  return (
    <SingleInputDialog
      triggerComponent={IconButton}
      triggerProps={{}}
      onSubmit={(name) => mutate({ name })}
      helperText={error?.message}
      isError={isError}
      isPending={isPending}
      isSuccess={isSuccess}
      placeholder="Category name"
      reset={reset}
    >
      <AddIcon fontSize="medium" />
    </SingleInputDialog>
  );
}
