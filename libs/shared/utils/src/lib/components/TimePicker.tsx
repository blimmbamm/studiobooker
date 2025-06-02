import {
  TimePicker as MuiTimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers';

type Props = { hidden?: boolean } & TimePickerProps;

export function TimePicker({ hidden = false, ...timePickerProps }: Props) {
  return (
    <MuiTimePicker
      ampm={false}
      slots={{
        inputAdornment: () => null,
      }}
      slotProps={{
        textField: {
          sx: {
            visibility: hidden ? 'hidden' : 'visible',
            '& .MuiPickersSectionList-root': {
              width: 'fit-content',
            },
          },
          size: 'small',
        },
      }}
      {...timePickerProps}
    />
  );
}
