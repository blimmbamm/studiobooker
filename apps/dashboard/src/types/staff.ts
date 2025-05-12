export type Staff = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
};

export type EditStaffDto = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};
