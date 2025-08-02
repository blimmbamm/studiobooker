import React, { createContext, useContext, useMemo } from 'react';
import { useCalendarStaffSelection } from '../hooks/useCalendarStaffSelection';

const COLORS = [
  '#EF5350', // Medium Red
  '#FFA726', // Orange
  '#FFD54F', // Warm Yellow
  '#9CCC65', // Leaf Green
  '#4DB6AC', // Teal
  '#4FC3F7', // Sky Blue
  '#64B5F6', // Light Blue
  '#BA68C8', // Medium Purple
  '#F06292', // Rosy Pink
  '#BDBDBD', // Medium Gray
];

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
