import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const VIEW_MODES = ['week', 'day'] as const;
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
    return viewMode.charAt(0).toUpperCase() + viewMode.slice(1);
  }

  useEffect(() => {
    if (!viewModeParam || !VIEW_MODES.includes(viewModeParam as ViewMode)) {
      setViewMode('week');
    }
  }, [viewModeParam]);

  return {
    viewMode: VIEW_MODES.includes(viewModeParam as ViewMode)
      ? (viewModeParam as ViewMode)
      : 'week',
    setViewMode,
    viewModeLabel,
  };
}
