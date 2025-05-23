import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useEditWorkingTime } from '../../../../hooks/working-time.queries';
import { WorkingTime } from '../../../../types/working-time';

export function useStaffWorkingTime({
  staffId,
  workingTime,
}: {
  staffId: number;
  workingTime: WorkingTime;
}) {
  const [isTyping, setIsTyping] = useState(false);

  const [time, setTime] = useState<{ start: Dayjs; end: Dayjs }>({
    start: dayjs(workingTime.start, 'HH:mm'),
    end: dayjs(workingTime.end, 'HH:mm'),
  });

  const editWorkingTimeMutation = useEditWorkingTime({
    workingTimeId: workingTime.id,
    staffId: staffId,
    onEditing: () => setIsTyping(false),
  });

  useEffect(() => {
    if (!isTyping) {
      setTime({
        start: dayjs(workingTime.start, 'HH:mm'),
        end: dayjs(workingTime.end, 'HH:mm'),
      });
    }
  }, [workingTime]);

  function handleToggleWorkingTime({ isActivated }: { isActivated: boolean }) {
    editWorkingTimeMutation.mutate({
      inputs: {
        ...workingTime, // is this safe to do (thinking of render cycles etc.)?
        activated: !isActivated,
      },
    });
  }

  // Maybe this could be defined inline in the jsx template
  function handleChangeWorkingTime({
    start,
    end,
  }: {
    start: Dayjs;
    end: Dayjs;
  }) {
    setIsTyping(true);
    // Check if to-be-performed update is legitimate
    if (start.isBefore(end)) {
      setTime({ start, end });
    } else {
      return;
    }

    editWorkingTimeMutation.mutateDebounced({
      inputs: { start: start.format('HH:mm'), end: end.format('HH:mm') },
    });
  }

  function handleChangeStart(value: Dayjs) {
    handleChangeWorkingTime({
      start: value,
      end: dayjs(workingTime.end, 'HH:mm'),
    });
  }

  function handleChangeEnd(value: Dayjs) {
    handleChangeWorkingTime({
      start: dayjs(workingTime.start, 'HH:mm'),
      end: value,
    });
  }

  return {
    time,
    handleToggleWorkingTime,
    handleChangeStart,
    handleChangeEnd,
  };
}
