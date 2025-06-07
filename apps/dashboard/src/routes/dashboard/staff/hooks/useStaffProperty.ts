import { ChangeEvent, useEffect, useState } from 'react';
import { EditStaffDto, Staff } from '../../../../types/staff';
import { useEditStaff } from '../../../../hooks/staff.queries';
import { useDebouncedCallback } from '@studiobooker/utils';

export function useStaffProperty({
  staff,
  property,
  updateValueIf = () => true,
  submitValueIf = () => true,
  validationErrorHelperText = '',
}: {
  staff: Staff;
  property: keyof Staff;
  updateValueIf?: (value: string) => boolean;
  submitValueIf?: (value: string) => boolean;
  validationErrorHelperText?: string;
}) {
  const [value, setValue] = useState(staff[property]?.toString() || '');
  const [isTyping, setIsTyping] = useState(false);

  // Whether error should be visible
  const [showError, setShowError] = useState(false);

  const editStaffMutation = useEditStaff({
    staffId: staff.id,
    onSuccess: () => {},
    onError: () => {},
  });

  // Helper text to be shown below TextField if there is an error
  let helperText: string | undefined;

  if (!submitValueIf(value) && showError) {
    helperText = validationErrorHelperText;
  } else if (editStaffMutation.isError && showError) {
    helperText = 'Error, this is not saved!';
  }

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
    setShowError(false);

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
    setShowError(editStaffMutation.isError || !submitValueIf(value));
  }

  /**
   * If staff data updates due to refetching, update the state in here as well,
   * but only if user is not typing currently (i.e. if input is 'idle')
   */
  useEffect(() => {
    if (!isTyping && staff) {
      setValue(staff[property]?.toString() || '');
    }
    // add disable exhaustive deps hint for eslint here
  }, [staff]);

  return {
    value,
    showError,
    handleChange,
    checkErrors,
    helperText,
  };
}
