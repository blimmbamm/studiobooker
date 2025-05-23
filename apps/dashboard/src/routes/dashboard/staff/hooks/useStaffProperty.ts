import { ChangeEvent, useEffect, useState } from 'react';
import { EditStaffDto, Staff } from '../../../../types/staff';
import { useEditStaff } from '../../../../hooks/staff.queries';
import { useDebouncedCallback } from '../../../../../../../libs/shared/utils/src/lib/useDebouncedCallback';

export function useStaffProperty({
  staff,
  property,
  updateValueIf = () => true,
  submitValueIf = () => true,
}: {
  staff: Staff;
  property: keyof Staff;
  updateValueIf?: (value: string) => boolean;
  submitValueIf?: (value: string) => boolean;
}) {
  const [value, setValue] = useState(staff[property]?.toString() || '');
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);

  const editStaffMutation = useEditStaff({
    staffId: staff.id,
    onSuccess: () => {},
    onError: () => {},
  });

  // Actually, debouncing could also directly happen in useEditStaff
  const [editStaff, cancelEditStaff] = useDebouncedCallback(
    (input: EditStaffDto) => {
      setIsTyping(false);
      editStaffMutation.mutate({ input });
    },
    500
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    // Set typing to true here
    setIsTyping(true);
    setHasError(false);

    // Set typing to false again when mutate is finally triggered
    if (updateValueIf(value)) {
      setValue(value);
    } else {
      return;
    }

    if (submitValueIf(value)) {
      editStaff({
        [property]: value,
      });
    } else {
      cancelEditStaff();
    }
  }

  function checkErrors() {
    /**
     * set error state to `true` if mutation has error or if
     * `submitValueIf` yields `false` for the current value of `value`.
     *
     * This makes sense because if `submitValueIf(value)` is `false`,
     * the current value is not submitted and thus the input value is invalid.
     * The user should be informed about that fact.
     */
    setHasError(editStaffMutation.isError || !submitValueIf(value));
  }

  useEffect(() => {
    if (!isTyping && staff) {
      setValue(staff[property]?.toString() || '');
    }
    // add disable exhaustive deps hint for eslint here
  }, [staff]);

  return {
    value,
    hasError,
    handleChange,
    checkErrors,
  };
}
