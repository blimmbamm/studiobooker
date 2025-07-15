import dayjs, { Dayjs } from 'dayjs';
import {
  Appointment,
  CalendarDay,
} from '../routes/dashboard/calendar/Calendar';

function timeRangeMinutes(d: Dayjs) {
  return d.hour() * 60 + d.minute();
}

function format_date(date: string) {
  return dayjs(date, 'YYYY-MM-DD HH:mm');
}

function format_row({
  id,
  start,
  end,
  staff,
  staffIndex
}: {
  id: number;
  start: string;
  end: string;
  staff: { id: number };
  staffIndex: number;
}): Appointment {
  const tmp = {
    id,
    start: format_date(start),
    end: format_date(end),
    staff,
    staffIndex,
  };
  return {
    ...tmp,
    startNum: timeRangeMinutes(tmp.start),
    endNum: timeRangeMinutes(tmp.end),
  };
}

export const DUMMY_APPOINTMENTS: CalendarDay[] = [
  {
    date: dayjs('2025-07-08', 'YYYY-MM-DD'),
    staff: [
      {
        id: 0,
        appointments: [
          {
            id: 1,
            start: '2025-07-08 10:30',
            end: '2025-07-08 11:30',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 99,
            start: '2025-07-08 11:30',
            end: '2025-07-08 12:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 4,
            start: '2025-07-08 13:00',
            end: '2025-07-08 14:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 7,
            start: '2025-07-08 16:00',
            end: '2025-07-08 17:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
        ].map(format_row),
      },
      {
        id: 1,
        appointments: [
          {
            id: 2,
            start: '2025-07-08 11:00',
            end: '2025-07-08 13:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 5,
            start: '2025-07-08 14:15',
            end: '2025-07-08 16:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 8,
            start: '2025-07-08 16:30',
            end: '2025-07-08 17:30',
            staff: { id: 1 },
            staffIndex: 1,
          },
        ].map(format_row),
      },
      {
        id: 2,
        appointments: [
          {
            id: 3,
            start: '2025-07-08 10:45',
            end: '2025-07-08 11:15',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 6,
            start: '2025-07-08 14:00',
            end: '2025-07-08 15:30',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 9,
            start: '2025-07-08 17:15',
            end: '2025-07-08 18:00',
            staff: { id: 2 },
            staffIndex: 2,
          },
        ].map(format_row),
      },
    ],
  },
  {
    date: dayjs('2025-08-08', 'YYYY-MM-DD'),
    staff: [
      {
        id: 0,
        appointments: [
          {
            id: 1,
            start: '2025-08-08 10:30',
            end: '2025-08-08 11:30',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 4,
            start: '2025-08-08 13:00',
            end: '2025-08-08 14:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 7,
            start: '2025-08-08 16:00',
            end: '2025-08-08 17:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
        ].map(format_row),
      },
      {
        id: 1,
        appointments: [
          {
            id: 2,
            start: '2025-08-08 11:00',
            end: '2025-08-08 13:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 5,
            start: '2025-08-08 14:15',
            end: '2025-08-08 16:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 8,
            start: '2025-08-08 16:30',
            end: '2025-08-08 17:30',
            staff: { id: 1 },
            staffIndex: 1,
          },
        ].map(format_row),
      },
      {
        id: 2,
        appointments: [
          {
            id: 3,
            start: '2025-08-08 10:45',
            end: '2025-08-08 11:15',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 6,
            start: '2025-08-08 14:00',
            end: '2025-08-08 15:30',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 9,
            start: '2025-08-08 17:15',
            end: '2025-08-08 18:00',
            staff: { id: 2 },
            staffIndex: 2,
          },
        ].map(format_row),
      },
    ],
  },
  {
    date: dayjs('2025-09-08', 'YYYY-MM-DD'),
    staff: [
      {
        id: 0,
        appointments: [
          {
            id: 1,
            start: '2025-08-08 10:30',
            end: '2025-08-08 11:30',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 4,
            start: '2025-08-08 13:00',
            end: '2025-08-08 14:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 7,
            start: '2025-08-08 16:00',
            end: '2025-08-08 17:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
        ].map(format_row),
      },
      {
        id: 1,
        appointments: [
          {
            id: 2,
            start: '2025-08-08 11:00',
            end: '2025-08-08 13:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 5,
            start: '2025-08-08 14:15',
            end: '2025-08-08 16:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 8,
            start: '2025-08-08 16:30',
            end: '2025-08-08 17:30',
            staff: { id: 1 },
            staffIndex: 1,
          },
        ].map(format_row),
      },
      {
        id: 2,
        appointments: [
          {
            id: 3,
            start: '2025-08-08 10:45',
            end: '2025-08-08 11:15',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 6,
            start: '2025-08-08 14:00',
            end: '2025-08-08 15:30',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 9,
            start: '2025-08-08 17:15',
            end: '2025-08-08 18:00',
            staff: { id: 2 },
            staffIndex: 2,
          },
        ].map(format_row),
      },
    ],
  },
  {
    date: dayjs('2025-10-08', 'YYYY-MM-DD'),
    staff: [
      {
        id: 0,
        appointments: [
          {
            id: 1,
            start: '2025-08-08 10:30',
            end: '2025-08-08 11:30',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 4,
            start: '2025-08-08 13:00',
            end: '2025-08-08 14:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 7,
            start: '2025-08-08 16:00',
            end: '2025-08-08 17:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
        ].map(format_row),
      },
      {
        id: 1,
        appointments: [
          {
            id: 2,
            start: '2025-08-08 11:00',
            end: '2025-08-08 13:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 5,
            start: '2025-08-08 14:15',
            end: '2025-08-08 16:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 8,
            start: '2025-08-08 16:30',
            end: '2025-08-08 17:30',
            staff: { id: 1 },
            staffIndex: 1,
          },
        ].map(format_row),
      },
      {
        id: 2,
        appointments: [
          {
            id: 3,
            start: '2025-08-08 10:45',
            end: '2025-08-08 11:15',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 6,
            start: '2025-08-08 14:00',
            end: '2025-08-08 15:30',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 9,
            start: '2025-08-08 17:15',
            end: '2025-08-08 18:00',
            staff: { id: 2 },
            staffIndex: 2,
          },
        ].map(format_row),
      },
    ],
  },
  {
    date: dayjs('2025-11-08', 'YYYY-MM-DD'),
    staff: [
      {
        id: 0,
        appointments: [
          {
            id: 1,
            start: '2025-08-08 10:30',
            end: '2025-08-08 11:30',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 4,
            start: '2025-08-08 13:00',
            end: '2025-08-08 14:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
          {
            id: 7,
            start: '2025-08-08 16:00',
            end: '2025-08-08 17:00',
            staff: { id: 0 },
            staffIndex: 0,
          },
        ].map(format_row),
      },
      {
        id: 1,
        appointments: [
          {
            id: 2,
            start: '2025-08-08 11:00',
            end: '2025-08-08 13:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 5,
            start: '2025-08-08 14:15',
            end: '2025-08-08 16:00',
            staff: { id: 1 },
            staffIndex: 1,
          },
          {
            id: 8,
            start: '2025-08-08 16:30',
            end: '2025-08-08 17:30',
            staff: { id: 1 },
            staffIndex: 1,
          },
        ].map(format_row),
      },
      {
        id: 2,
        appointments: [
          {
            id: 3,
            start: '2025-08-08 10:45',
            end: '2025-08-08 11:15',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 6,
            start: '2025-08-08 14:00',
            end: '2025-08-08 15:30',
            staff: { id: 2 },
            staffIndex: 2,
          },
          {
            id: 9,
            start: '2025-08-08 17:15',
            end: '2025-08-08 18:00',
            staff: { id: 2 },
            staffIndex: 2,
          },
        ].map(format_row),
      },
    ],
  },
];

// export const DUMMY_APPOINTMENTS: CalendarDay[] = [
//   {
//     date: dayjs('2025-07-08', 'YYYY-MM-DD'),
//     appointments: [
//       {
//         id: 1,
//         start: '2025-07-08 10:30',
//         end: '2025-07-08 11:30',
//         staff: { id: 0 },
//         staffIndex: 0,
//       },
//       {
//         id: 3,
//         start: '2025-07-08 10:45',
//         end: '2025-07-08 11:15',
//         staff: { id: 2 },
//         staffIndex: 2,
//       },
//       {
//         id: 2,
//         start: '2025-07-08 11:00',
//         end: '2025-07-08 13:00',
//         staff: { id: 1 },
//         staffIndex: 1,
//       },
//       {
//         id: 4,
//         start: '2025-07-08 13:00',
//         end: '2025-07-08 14:00',
//         staff: { id: 0 },
//         staffIndex: 0,
//       },
//       {
//         id: 6,
//         start: '2025-07-08 14:00',
//         end: '2025-07-08 15:30',
//         staff: { id: 2 },
//         staffIndex: 2,
//       },
//       {
//         id: 5,
//         start: '2025-07-08 14:15',
//         end: '2025-07-08 16:00',
//         staff: { id: 1 },
//         staffIndex: 1,
//       },
//       {
//         id: 7,
//         start: '2025-07-08 16:00',
//         end: '2025-07-08 17:00',
//         staff: { id: 0 },
//         staffIndex: 0,
//       },
//       {
//         id: 8,
//         start: '2025-07-08 16:30',
//         end: '2025-07-08 17:30',
//         staff: { id: 1 },
//         staffIndex: 1,
//       },
//       {
//         id: 9,
//         start: '2025-07-08 17:15',
//         end: '2025-07-08 18:00',
//         staff: { id: 2 },
//         staffIndex: 2,
//       },
//     ].map(format_row),
//   },
//   {
//     date: dayjs('2025-08-08', 'YYYY-MM-DD'),
//     appointments: [
//       {
//         id: 1,
//         start: '2025-08-08 10:30',
//         end: '2025-08-08 11:30',
//         staff: { id: 0 },
//         staffIndex: 0,
//       },
//       {
//         id: 3,
//         start: '2025-08-08 10:45',
//         end: '2025-08-08 11:15',
//         staff: { id: 2 },
//         staffIndex: 2,
//       },
//       {
//         id: 2,
//         start: '2025-08-08 11:00',
//         end: '2025-08-08 13:00',
//         staff: { id: 1 },
//         staffIndex: 1,
//       },
//       {
//         id: 4,
//         start: '2025-08-08 13:00',
//         end: '2025-08-08 14:00',
//         staff: { id: 0 },
//         staffIndex: 0,
//       },
//       {
//         id: 6,
//         start: '2025-08-08 14:00',
//         end: '2025-08-08 15:30',
//         staff: { id: 2 },
//         staffIndex: 2,
//       },
//       {
//         id: 5,
//         start: '2025-08-08 14:15',
//         end: '2025-08-08 16:00',
//         staff: { id: 1 },
//         staffIndex: 1,
//       },
//       {
//         id: 7,
//         start: '2025-08-08 16:00',
//         end: '2025-08-08 17:00',
//         staff: { id: 0 },
//         staffIndex: 0,
//       },
//       {
//         id: 8,
//         start: '2025-08-08 16:30',
//         end: '2025-08-08 17:30',
//         staff: { id: 1 },
//         staffIndex: 1,
//       },
//       {
//         id: 9,
//         start: '2025-08-08 17:15',
//         end: '2025-08-08 18:00',
//         staff: { id: 2 },
//         staffIndex: 2,
//       },
//     ].map(format_row),
//   },
// ];
// } ];
//   //   // Tuesday
//   { id: 1, start: '2025-07-08 10:30', end: '2025-07-08 11:30', staff: 0, color: 'green' },
//   { id: 3, start: '2025-07-08 10:45', end: '2025-07-08 11:15', staff: 2, color: 'yellow' },
//   { id: 2, start: '2025-07-08 11:00', end: '2025-07-08 13:00', staff: 1, color: 'magenta' },
//   { id: 4, start: '2025-07-08 13:00', end: '2025-07-08 14:00', staff: 0, color: 'green' },
//   { id: 6, start: '2025-07-08 14:00', end: '2025-07-08 15:30', staff: 2, color: 'yellow' },
//   { id: 5, start: '2025-07-08 14:15', end: '2025-07-08 16:00', staff: 1, color: 'magenta' },
//   { id: 7, start: '2025-07-08 16:00', end: '2025-07-08 17:00', staff: 0, color: 'green' },
//   { id: 8, start: '2025-07-08 16:30', end: '2025-07-08 17:30', staff: 1, color: 'magenta' },
//   { id: 9, start: '2025-07-08 17:15', end: '2025-07-08 18:00', staff: 2, color: 'yellow' },

//   // // Wednesday
//   // { id: 1, start: '2025-08-08 10:30', end: '2025-08-08 11:30', staff: 0, color: 'green' },
//   // { id: 3, start: '2025-08-08 10:45', end: '2025-08-08 11:15', staff: 2, color: 'yellow' },
//   // { id: 2, start: '2025-08-08 11:00', end: '2025-08-08 13:00', staff: 1, color: 'magenta' },
//   // { id: 4, start: '2025-08-08 13:00', end: '2025-08-08 14:00', staff: 0, color: 'green' },
//   // { id: 6, start: '2025-08-08 14:00', end: '2025-08-08 15:30', staff: 2, color: 'yellow' },
//   // { id: 5, start: '2025-08-08 14:15', end: '2025-08-08 16:00', staff: 1, color: 'magenta' },
//   // { id: 7, start: '2025-08-08 16:00', end: '2025-08-08 17:00', staff: 0, color: 'green' },
//   // { id: 8, start: '2025-08-08 16:30', end: '2025-08-08 17:30', staff: 1, color: 'magenta' },
//   // { id: 9, start: '2025-08-08 17:15', end: '2025-08-08 18:00', staff: 2, color: 'yellow' },
// ].map(appointment => (
//   {...appointment, }
// ))
