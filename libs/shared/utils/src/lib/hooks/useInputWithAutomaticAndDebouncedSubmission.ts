import { ChangeEvent, useEffect, useState } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

export function useInputWithAutomaticAndDebouncedSubmission({
  initialValue,
  updateValueIf = () => true,
  submitValueIf = () => true,
  validationErrorHelperText = '',
  isError,
  onSubmit,
  debounceTimeout = 500,
}: {
  initialValue: string;
  updateValueIf?: (value: string) => boolean;
  submitValueIf?: (value: string) => boolean;
  validationErrorHelperText?: string;
  isError: boolean;
  onSubmit: (inputs: string) => void;
  debounceTimeout?: number
}) {
  const [value, setValue] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);

  // Whether error should be visible
  const [showError, setShowError] = useState(false);

  // Helper text to be shown below TextField if there is an error
  let helperText: string | undefined;

  if (!submitValueIf(value) && showError) {
    helperText = validationErrorHelperText;
  } else if (isError && showError) {
    helperText = 'Error, this is not saved!';
  }

  const [edit, cancelEdit] = useDebouncedCallback((input: string) => {
    setIsTyping(false);
    onSubmit(input);
  }, debounceTimeout);

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

    // Trigger debounced submission if allowed AND
    // cancel if value is invalid again before submission was triggered
    if (submitValueIf(value)) {
      edit(value);
    } else {
      cancelEdit();
    }
  }

  /**
   * set error state to `true` if mutation has error or if
   * `submitValueIf` yields `false` for the current value of `value`.
   *
   * This makes sense because if `submitValueIf(value)` is `false`,
   * the current value is not submitted and thus the input value is invalid.
   * The user should be informed about that fact.
   */
  function checkErrors() {
    setShowError(isError || !submitValueIf(value));
  }

  /**
   * If staff data updates due to refetching, update the state in here as well,
   * but only if user is not typing currently (i.e. if input is 'idle')
   */
  useEffect(() => {
    if (!isTyping && initialValue) {
      setValue(initialValue);
      console.log('setting value from query');
    }
    // add disable exhaustive deps hint for eslint here
  }, [initialValue]);

  return {
    value,
    showError,
    handleChange,
    checkErrors,
    helperText,
  };
}
