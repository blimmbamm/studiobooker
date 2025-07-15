import { CalendarDay } from './Calendar';
import DayView from './DayView';

type Props = {
  days: CalendarDay[];
};

export default function WeekView({ days }: Props) {
  return days.map((day, index) => (
    <DayView
      key={day.date.toString()}
      day={day}
      // width={0}
      // nStaff={3}
      // firstDay={index === 0}
      // lastDay={index === days.length - 1}
    />
  ));
}
