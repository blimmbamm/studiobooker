import AddIcon from '@mui/icons-material/Add';

import { SingleInputDialog } from '@studiobooker/utils';
import { useAddCategory } from '../../../../../hooks/service.queries';

export default function AddCategory() {
  const { mutate, error, isError, isPending, isSuccess, reset } =
    useAddCategory();

  return (
    <SingleInputDialog
      buttonIcon={<AddIcon fontSize="medium" />}
      onSubmit={(name) => mutate({ name })}
      helperText={error?.message}
      isError={isError}
      isPending={isPending}
      isSuccess={isSuccess}
      placeholder="Category name"
      reset={reset}
    />
  );
}
