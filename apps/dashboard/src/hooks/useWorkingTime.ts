import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { EditWorkingTimeDto, WorkingTime } from '../types/working-time';

type UseWorkingTimeParams = {
  workingTime: WorkingTime;
  mutate: (args: { inputs: EditWorkingTimeDto }) => void;
  mutateDebounced: (args: {
    inputs: EditWorkingTimeDto;
    onEdit?: () => void;
  }) => void;
};

export function useWorkingTime({
  workingTime,
  mutate,
  mutateDebounced,
}: UseWorkingTimeParams) {
  const [isTyping, setIsTyping] = useState(false);

  const [time, setTime] = useState<{ start: Dayjs; end: Dayjs }>({
    start: dayjs(workingTime.start, 'HH:mm'),
    end: dayjs(workingTime.end, 'HH:mm'),
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
    mutate({
      inputs: {
        ...workingTime, // is this safe to do (thinking of render cycles etc.)?
        activated: !isActivated,
      },
    });
  }

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

    mutateDebounced({
      inputs: { start: start.format('HH:mm'), end: end.format('HH:mm') },
      onEdit: () => setIsTyping(false),
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
