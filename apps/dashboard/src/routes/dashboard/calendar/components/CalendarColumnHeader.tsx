import { BoxProps, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { CalendarDay } from '@studiobooker/utils';

import GridLines from './GridLines';

type Props = { days: CalendarDay[] } & BoxProps;

export default function CalendarColumnHeader({ days, ...boxProps }: Props) {
  return (
    <Box
      paddingInline={8}
      height="2rem"
      position="sticky"
      bgcolor={grey[100]}
      zIndex={1}
      display="flex"
      gap={1}
      alignItems="center"
      borderTop={1}
      borderColor={(theme) => theme.palette.divider}
      {...boxProps}
    >
      <GridLines nCols={days.length} gridImageHeight="calc(2rem - 1px)" />
      {days.map((day) => (
        <Typography
          key={day.dateStr}
          fontSize="0.8rem"
          noWrap
          textAlign="center"
          flex={1}
        >
          {day.date.format('dd, MMM D')}
        </Typography>
      ))}
    </Box>
  );
}
