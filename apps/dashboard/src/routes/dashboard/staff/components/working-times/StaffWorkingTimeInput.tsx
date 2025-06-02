import { Dayjs } from 'dayjs';

import { TimePicker } from '@studiobooker/utils';
import { Box } from '@mui/material';

export default function StaffWorkingTimeInput(props: {
  value: Dayjs;
  activated: boolean;
  onChange: (value: Dayjs) => void;
}) {
  return (
    // Box is needed (!) because otherwise TimePicker 
    // gets focussed on outside click, somehow...
    <Box> 
      <TimePicker
        value={props.value}
        disabled={!props.activated}
        onChange={(value) => {
          if (value) {
            props.onChange(value);
          }
        }}
      />
    </Box>
  );
}
