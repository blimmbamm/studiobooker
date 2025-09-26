import { Box, IconButton, Typography } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { TimePicker, WorkingTime, Staff } from '@studiobooker/utils';

import { useStaffWorkingTime } from '../../hooks/useStaffWorkingTime';
import { useStaffActivationValidation } from '../../../../../contexts/StaffActivationValidationContext';

type Props = {
  workingTime: WorkingTime;
  staff: Staff;
};

export default function StaffWorkingTime({ staff, workingTime }: Props) {
  const { time, handleToggleWorkingTime, handleChangeStart, handleChangeEnd } =
    useStaffWorkingTime({ staffId: staff.id, workingTime });

  const { resetError } = useStaffActivationValidation();

  const workingTimeDisabled = !workingTime.activated || staff.activated;

  return (
    <>
      <Box display="flex" alignItems={'center'}>
        <IconButton
          onClick={() => {
            resetError('working-times');
            handleToggleWorkingTime({ isActivated: workingTime.activated });
          }}
          disabled={staff.activated}
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
        disabled={workingTimeDisabled}
      />
      <TimePicker
        value={time.end}
        onChange={handleChangeEnd}
        disabled={workingTimeDisabled}
      />
    </>
  );
}
