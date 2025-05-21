import { Box, IconButton, Typography } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { WorkingTime } from '../../../types/working-time';
import { useEditWorkingTime } from '../../../hooks/working-time.queries';
import StaffWorkingTimeInput from './StaffWorkingTimeInput';

export default function StaffWorkingTime(props: {
  workingTime: WorkingTime;
  staffId: number;
}) {
  const { workingTime } = props;

  const editWorkingTimeMutation = useEditWorkingTime({
    workingTimeId: workingTime.id,
    staffId: props.staffId,
  });

  function handleToggleWorkingTime({ isActivated }: { isActivated: boolean }) {
    editWorkingTimeMutation.mutate({
      inputs: {
        // start: props.workingTime.start,
        // end: props.workingTime.start,
        // weekday: props.workingTime.weekday,
        ...props.workingTime, // is this safe to do (thinking of render cycles etc.)?
        activated: !isActivated,
      },
    });
  }

  // Maybe this could be defined inline in the jsx template
  function handleChangeTime({ start, end }: { start: string; end: string }) {
    editWorkingTimeMutation.mutateDebounced({
      inputs: { start, end },
    });
  }

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
        <Typography>{workingTime.weekday}</Typography>
      </Box>
      <Box padding={1}>
        {/* maybe can add margin to textfield instead of adding padding to surrounding box */}
        <StaffWorkingTimeInput
          value={workingTime.start}
          activated={workingTime.activated}
          onChange={(value) =>
            handleChangeTime({ start: value, end: props.workingTime.end })
          }
        />
      </Box>
      <Box padding={1}>
        <StaffWorkingTimeInput
          value={workingTime.end}
          activated={workingTime.activated}
          onChange={(value) =>
            handleChangeTime({ start: props.workingTime.start, end: value })
          }
        />
      </Box>
    </>
  );
}
