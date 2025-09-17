import { Box, Typography } from '@mui/material';

import { TimePicker, WorkingTime } from '@studiobooker/utils';

import { useWorkingTimeSetting } from '../../hooks/useWorkingTimeSetting';

type Props = { workingTimeSetting: WorkingTime };

export default function WorkingTimeSetting({ workingTimeSetting }: Props) {
  const { time, handleChangeStart, handleChangeEnd } = useWorkingTimeSetting({
    workingTime: workingTimeSetting,
  });

  return (
    <>
      <Box display="flex" alignItems={'center'}>
        <Typography>{workingTimeSetting.weekday}</Typography>
      </Box>
      <TimePicker value={time.start} onChange={handleChangeStart} />
      <TimePicker value={time.end} onChange={handleChangeEnd} />
    </>
  );
}
