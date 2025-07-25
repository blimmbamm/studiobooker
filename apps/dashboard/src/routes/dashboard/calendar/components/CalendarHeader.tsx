import {
  Box,
  Typography,
  BoxProps,
  Button,
  IconButton,
  TextField,
  MenuItem,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useCalendarTimeRange } from '../hooks/useCalendarTimeRange';
import { useCalendarViewMode, VIEW_MODES } from '../hooks/useCalendarViewMode';

type Props = {} & BoxProps;

export default function CalendarHeader({ height }: Props) {
  const { timeRangeLabel, forward, backward } = useCalendarTimeRange();

  const { viewMode, setViewMode, viewModeLabel } = useCalendarViewMode();

  return (
    <Box
      bgcolor="white"
      zIndex={1}
      top={0}
      position="sticky"
      height={height}
      display={'flex'}
      alignItems={'center'}
      padding={2}
    >
      <Button variant="outlined" color="inherit">
        Today
      </Button>
      <Box flex={1} />
      <IconButton onClick={backward} size="small">
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography noWrap>{timeRangeLabel()}</Typography>
      <IconButton onClick={forward} size="small">
        <KeyboardArrowRightIcon />
      </IconButton>
      <Box flex={1} />
      <TextField
        select
        size="small"
        color="info"
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value)}
      >
        {VIEW_MODES.map((mode) => (
          <MenuItem key={mode} value={mode}>
            {viewModeLabel(mode)}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
