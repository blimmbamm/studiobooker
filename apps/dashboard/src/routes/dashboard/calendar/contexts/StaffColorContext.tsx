import React, { createContext, useContext, useMemo } from 'react';

import { useCalendarStaffSelection } from '../hooks/useCalendarStaffSelection';

const COLORS = [
  '#f36c60', // Soft Coral Red
  '#FFB74D', // Moderate Orange
  '#dbc777', // Mellow Yellow
  '#AED581', // Balanced Green
  '#4DD0B0', // Soft Teal
  '#81D4FA', // Calm Sky Blue
  '#90CAF9', // Light Blue
  '#b39ddb', // Light Purple
  '#F48FB1', // Dusty Pink
  '#D6D6D6', // Gentle Gray

  // '#F28B82', // Soft Red
  // '#FBBC04', // Light Orange
  // '#FFF475', // Soft Yellow
  // '#CCFF90', // Light Green
  // '#A7FFEB', // Mint
  // '#CBF0F8', // Light Cyan
  // '#AECBFA', // Light Blue
  // '#D7AEFB', // Lavender
  // '#FDCFE8', // Pink
  // '#E8EAED', // Light Gray
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
