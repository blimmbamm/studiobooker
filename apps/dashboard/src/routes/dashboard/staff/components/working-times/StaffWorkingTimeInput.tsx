import { Dayjs } from 'dayjs';

import { TimePicker } from '@studiobooker/utils';

export default function StaffWorkingTimeInput(props: {
  value: Dayjs;
  activated: boolean;
  onChange: (value: Dayjs) => void;
}) {
  return (
    <TimePicker
      value={props.value}
      disabled={!props.activated}
      onChange={(value) => {
        if (value) {
          props.onChange(value);
        }
      }}
    />
  );
}
