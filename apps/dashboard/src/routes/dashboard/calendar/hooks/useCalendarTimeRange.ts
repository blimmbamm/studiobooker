import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCalendarViewMode } from './useCalendarViewMode';

dayjs.extend(utc);

export function useCalendarTimeRange() {
  const { viewMode } = useCalendarViewMode();

  const [params, setParams] = useSearchParams();

  function parseStrict(value: string | null) {
    return dayjs.utc(value, 'YYYYMMDD', true);
  }

  const from = parseStrict(params.get('from'));
  const to = parseStrict(params.get('to'));

  function rangeIsValid(from: Dayjs, to: Dayjs) {
    if (!(from.isValid() && to.isValid())) {
      return false;
    }

    if (viewMode === 'day') {
      return from.isSame(to);
    } else if (viewMode === 'workweek') {
      return from.day() === 1 && to.day() === 5;
    } else {
      return false;
    }
  }

  function getDefaultStart(dRef: Dayjs = dayjs()) {
    if (viewMode === 'day') {
      return dRef;
    } else {
      return dRef.subtract(dRef.day() - 1, 'days');
    }
  }

  function getDefaultEnd(dRef: Dayjs = dayjs()) {
    if (viewMode === 'day') {
      return dRef;
    } else {
      return dRef.add(5 - dRef.day(), 'days');
    }
  }

  function setTimeRange(from: Dayjs, to: Dayjs) {
    setParams(
      (pParams) => {
        const newParams = new URLSearchParams(pParams);
        newParams.set('from', from.format('YYYYMMDD'));
        newParams.set('to', to.format('YYYYMMDD'));
        return newParams;
      },
      { replace: true }
    );
  }

  useEffect(() => {
    if (!rangeIsValid(from, to)) {
      setTimeRange(getDefaultStart(), getDefaultEnd());
    }
  }, [from, to, viewMode]); // also run effect if viewMode changes?!

  const timeRange = rangeIsValid(from, to)
    ? {
        from: from.format('YYYYMMDD'),
        to: to.format('YYYYMMDD'),
      }
    : undefined;

  function timeRangeLabel() {
    switch (viewMode) {
      case 'day':
        return from.format('MMMM DD, YYYY');
      case 'workweek':
        return `${from.format('MMMM DD')} - ${to.format(
          `${from.month() != to.month() ? 'MMMM ' : ''}DD, YYYY`
        )}`;
      default:
        return '';
    }
  }

  function forward() {
    switch (viewMode) {
      case 'day':
        setTimeRange(from.add(1, 'days'), to.add(1, 'days'));
        break;
      case 'workweek':
        setTimeRange(from.add(7, 'days'), to.add(7, 'days'));
        break;
      default:
        break;
    }
  }

  function backward() {
    switch (viewMode) {
      case 'day':
        setTimeRange(from.subtract(1, 'days'), to.subtract(1, 'days'));
        break;
      case 'workweek':
        setTimeRange(from.subtract(7, 'days'), to.subtract(7, 'days'));
        break;
      default:
        break;
    }
  }

  return {
    timeRange,
    timeRangeLabel,
    forward,
    backward,
  };
}
