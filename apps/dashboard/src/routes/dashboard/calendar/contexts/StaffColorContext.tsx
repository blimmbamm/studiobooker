import React, { createContext, useContext, useMemo } from 'react';
import { useCalendarStaffSelection } from '../hooks/useCalendarStaffSelection';

const COLORS = ['#FF5733', '#33A1FF', '#3b944bff', '#FFC300', '#8E44AD'];

type StaffColorMap = Record<number, string>;

const ColorMapContext = createContext<StaffColorMap | null>(null);

export const useStaffColors = () => {
  const context = useContext(ColorMapContext);
  if (!context) {
    throw new Error(
      'useStaffColors must be used within a <StaffColorProvider>'
    );
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const StaffColorProvider = ({ children }: Props) => {
  const { staffIds } = useCalendarStaffSelection();

  const colorMap = useMemo(() => {
    const mapping: StaffColorMap = {};

    staffIds?.forEach((staffId, index) => {
      mapping[staffId] = COLORS[index % COLORS.length];
    });

    return mapping;
  }, [staffIds]);

  return (
    <ColorMapContext.Provider value={colorMap}>
      {children}
    </ColorMapContext.Provider>
  );
};
