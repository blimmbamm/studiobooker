import { Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export default function StaffWorkingTimeInput(props: {
  value: Dayjs;
  activated: boolean;
  onChange: (value: Dayjs) => void;
}) {
  return (
    <Box padding={1}>
      <TimePicker
        sx={{ m: 5}}
        value={props.value}
        disabled={!props.activated}
        onChange={(value) => {
          if (value) {
            props.onChange(value);
          }
        }}
        ampm={false}
        slots={{
          inputAdornment: () => null,
        }}
        slotProps={{
          textField: { sx: { width: '80px' } },
        }}
      />
    </Box>
  );
}
