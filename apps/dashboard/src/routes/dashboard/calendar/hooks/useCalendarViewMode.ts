import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const VIEW_MODES = ['day', 'workweek', 'week'] as const;
type ViewMode = (typeof VIEW_MODES)[number];

export function useCalendarViewMode() {
  const [params, setParams] = useSearchParams();
  const viewModeParam = params.get('view');

  function setViewMode(viewMode: string) {
    // Update if allowed
    if (VIEW_MODES.includes(viewMode as ViewMode)) {
      setParams((pParams) => {
        const newParams = new URLSearchParams(pParams);
        newParams.set('view', viewMode);
        return newParams;
      });
    }
  }

  function viewModeLabel(viewMode: ViewMode) {
    switch (viewMode) {
      case 'day':
        return 'Day';
      case 'week':
        return 'Week';
      case 'workweek':
        return 'Work week';
    }
  }

  useEffect(() => {
    if (!viewModeParam || !VIEW_MODES.includes(viewModeParam as ViewMode)) {
      setViewMode('workweek');
    }
  }, [viewModeParam]);

  return {
    viewMode: VIEW_MODES.includes(viewModeParam as ViewMode)
      ? (viewModeParam as ViewMode)
      : 'workweek',
    setViewMode,
    viewModeLabel,
  };
}
