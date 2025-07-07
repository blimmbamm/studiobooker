import { Box, IconButton, Typography } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { TimePicker } from '@studiobooker/utils';
import { WorkingTime } from '../../../../../types/working-time';
import { useStaffWorkingTime } from '../../hooks/useStaffWorkingTime';

export default function StaffWorkingTime(props: {
  workingTime: WorkingTime;
  staffId: number;
}) {
  const { workingTime, staffId } = props;

  const { time, handleToggleWorkingTime, handleChangeStart, handleChangeEnd } =
    useStaffWorkingTime({ staffId, workingTime });

  return (
    <>
      <Box display="flex" alignItems={'center'}>
        <IconButton
          onClick={() =>
            handleToggleWorkingTime({ isActivated: workingTime.activated })
          }
        >
          {workingTime.activated ? (
            <CheckBoxOutlinedIcon />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon />
          )}
        </IconButton>
        <Typography paddingLeft={1}>{workingTime.weekday}</Typography>
      </Box>
      <TimePicker
        value={time.start}
        onChange={handleChangeStart}
        disabled={!workingTime.activated}
      />
      <TimePicker
        value={time.end}
        onChange={handleChangeEnd}
        disabled={!workingTime.activated}
      />
    </>
  );
}
