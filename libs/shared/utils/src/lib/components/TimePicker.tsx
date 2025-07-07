import { Dayjs } from 'dayjs';
import {
  TimePicker as MuiTimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers';
import { Box } from '@mui/material';

type Props = { onChange?: (value: Dayjs) => void; hidden?: boolean } & Omit<
  TimePickerProps,
  'onChange'
>;

export function TimePicker({
  hidden = false,
  onChange,
  ...timePickerProps
}: Props) {
  return (
    <Box>
      <MuiTimePicker
        ampm={false}
        slots={{
          inputAdornment: () => null,
        }}
        onChange={onChange}
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
    </Box>
  );
}
