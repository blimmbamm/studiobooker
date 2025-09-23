import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

import {
  SingleInputDialog,
  ServiceCategoryStructured,
} from '@studiobooker/utils';
import { useAddService } from '../../../../../hooks/queries/service.queries';


type Props = {
  category?: ServiceCategoryStructured;
};

export default function AddService({ category }: Props) {
  const { mutate, error, isError, isPending, isSuccess, reset } =
    useAddService();

  function handleSubmit(title: string) {
    if (category) {
      mutate({ title, categoryId: category.id });
    }
  }

  return (
    <SingleInputDialog
      triggerComponent={IconButton}
      triggerProps={{ sx: { visibility: category ? 'visible' : 'hidden' } }}
      onSubmit={handleSubmit}
      helperText={error?.message}
      isError={isError}
      isPending={isPending}
      isSuccess={isSuccess}
      reset={reset}
      placeholder="Service title"
    >
      <AddIcon fontSize="medium" />
    </SingleInputDialog>
  );
}
