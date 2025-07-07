import { Typography } from '@mui/material';

import { TimePickerSkeleton } from '@studiobooker/utils';

type Props = { weekday: string };

export default function WorkingTimeSettingSkeleton({ weekday }: Props) {
  return (
    <>
      <Typography>{weekday}</Typography>
      {[1, 2].map((index) => (
        <TimePickerSkeleton key={index} />
      ))}
    </>
  );
}
