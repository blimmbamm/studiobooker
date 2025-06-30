import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { SingleInputDialog } from '@studiobooker/utils';
import { useAddStaff } from '../../../../../hooks/staff.queries';

export default function AddStaff() {
  const { mutate, error, isError, isPending, isSuccess, reset } = useAddStaff();

  return (
    <SingleInputDialog
      buttonIcon={<PersonAddIcon fontSize="medium" />}
      onSubmit={(name) => mutate({ name })}
      helperText={error?.message}
      isError={isError}
      isPending={isPending}
      reset={reset}
      isSuccess={isSuccess}
      placeholder="Name"
    />
  );
}
