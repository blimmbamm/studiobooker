import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { PickerValue } from '@mui/x-date-pickers/internals';

export default function StaffWorkingTimeInput(props: {
  value: string;
  activated: boolean;
  onChange: (value: string) => void;
}) {
  const [value, setValue] = useState<Dayjs>(dayjs(props.value, 'HH:mm'));

  useEffect(() => {
    console.log('new time value by effect');
    setValue(dayjs(props.value, 'HH:mm'));
  }, [props.value]);

  function handleChange(value: PickerValue) {
    if (value) {
      setValue(value);
      props.onChange(value.format('HH:mm'));
    }
  }

  return (
    <TimePicker
      value={value}
      disabled={!props.activated}
      onChange={handleChange}
      ampm={false}
      slots={{
        inputAdornment: () => null,
      }}
      slotProps={{
        textField: { sx: { width: '80px' } },
      }}
    />
  );
}
