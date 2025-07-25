import {
  Box,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

import { FallbackMessage } from '@studiobooker/utils';
import { Service } from '../../../../../types/service';
import { Staff } from '../../../../../types/staff';
import { useAvailableAppointmentSlots } from '../../hooks/useAvailableAppointmentSlots';
import { useState } from 'react';
import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';

type Props = {
  selectedService: Service;
  selectedStaff: Staff;
  selectedDate: Dayjs | null;
  onSelectDate: (date: Dayjs) => void;
} & AddAppointmentStepNavigationProps;

export default function AppointmentDateAndTimeSelection({
  selectedService,
  selectedStaff,
  selectedDate,
  onSelectDate,
  ...stepNavigationProps
}: Props) {
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const startOfToday = dayjs().tz(clientTimeZone).startOf('day');
  const [startDate, setStartDate] = useState(startOfToday);

  function forward() {
    setStartDate((prevStartDate) => prevStartDate.add(5, 'days'));
  }

  function backward() {
    setStartDate((prevStartDate) => prevStartDate.subtract(5, 'days'));
  }

  const { slots, noSlots, isPending, isError } = useAvailableAppointmentSlots({
    service: selectedService,
    staff: selectedStaff,
    date: startDate,
  });

  if (isPending) return <CircularProgress />;

  if (isError)
    return <FallbackMessage message="Failed to load available slots." />;

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={'repeat(7, 1fr)'}
        alignItems={'center'}
        justifyItems={'center'}
      >
        <IconButton
          size="small"
          onClick={backward}
          disabled={startDate.isSame(startOfToday)}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        {slots?.map(({ day }) => (
          <Typography key={day.toISOString()}>
            {day.format('dd, M/DD')}
          </Typography>
        ))}
        <IconButton size="small" onClick={forward}>
          <KeyboardArrowRightIcon />
        </IconButton>
        <Box />
        {slots?.map(({ day, slots }) => (
          <Box
            key={day.toString()}
            display={'flex'}
            flexDirection={'column'}
            alignSelf={'normal'}
            gap={0.5}
          >
            {slots.map((slot) => (
              <Chip
                key={slot.date.toISOString()}
                clickable
                onClick={() => onSelectDate(slot.date)}
                label={slot.date.format('HH:mm')}
                color={selectedDate?.isSame(slot.date) ? 'primary' : 'default'}
              />
            ))}
          </Box>
        ))}
      </Box>
      {noSlots && (
        <Typography m={'auto'}>
          No slots available for these dates. :(
        </Typography>
      )}
      <AddAppointmentStepNavigation
        {...stepNavigationProps}
        nextDisabled={!Boolean(selectedDate)}
      />
    </>
  );
}
