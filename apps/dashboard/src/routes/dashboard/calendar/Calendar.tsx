import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

import { Appointment } from '@studiobooker/utils';

import AxisLabels from './components/AxisLabels';
import GridLines from './components/GridLines';
import CalendarHeader from './components/CalendarHeader';
import CalendarColumnHeader from './components/CalendarColumnHeader';
import DayView from './DayView';
import { useCalendarData } from './hooks/useCalendarData';
import CalendarLoadingOverlay from './components/CalendarLoadingOverlay';
import ScrollToAnchor from './components/ScrollToAnchor';
import AppointmentDetailsDialog from './components/calendar-appointment/AppointmentDetailsDialog';

export default function Calendar() {
  const { calendarDays, isFetching } = useCalendarData(); // this could use useViewMode etc. itself

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  function handleClickAppointment(appointment: Appointment) {
    setSelectedAppointment(appointment);
  }

  return (
    <>
      <CalendarHeader height={56} />
      {isFetching && <CalendarLoadingOverlay />}
      {calendarDays && (
        <>
          <CalendarColumnHeader days={calendarDays} top={56} />
          <Box
            display="flex"
            gap={1}
            width="100%"
            paddingLeft={8} // increase padding to have space for legend
            paddingRight={8}
            position="relative"
            marginBottom={5}
            borderBottom={1}
            borderColor={(theme) => theme.palette.divider}
            bgcolor={grey[100]}
          >
            {/* Grid lines and axis labels: */}
            <GridLines nCols={calendarDays.length} gridImageHeight="60px" />
            <AxisLabels boxProps={{ left: 0 }} typographyProps={{ right: 4 }} />
            <AxisLabels boxProps={{ right: 0 }} typographyProps={{ left: 4 }} />

            {/* Actual calendar/appointment data: */}
            {calendarDays.map((day) => (
              <DayView
                key={day.dateStr}
                day={day}
                onClickAppointment={handleClickAppointment}
              />
            ))}

            {/* Element that gets scrolled into view, 
                depending on current time: */}
            <ScrollToAnchor />
          </Box>
          <AppointmentDetailsDialog
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
          />
        </>
      )}
    </>
  );
}
