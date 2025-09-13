export type ApiAppointmentSlot = {
  date: string;
  staffIds: number[];
};

export type ApiAvailableAppointmentSlots = {
  day: string;
  slots: ApiAppointmentSlot[];
};
