import AddIcon from '@mui/icons-material/Add';

import { SingleInputDialog } from '@studiobooker/utils';
import { useAddService } from '../../../../../hooks/service.queries';
import { ServiceCategoryStructured } from '../../../../../types/service-category';

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
      buttonIcon={
        <AddIcon
          sx={{ visibility: category ? 'visible' : 'hidden' }}
          fontSize="medium"
        />
      }
      onSubmit={handleSubmit}
      helperText={error?.message}
      isError={isError}
      isPending={isPending}
      isSuccess={isSuccess}
      reset={reset}
      placeholder="Service title"
    />
  );
}
