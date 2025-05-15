export type Service = {
  id: number;
  title: string;
  description: string | null;
  duration: number | null;
  price: number | null;
  dingens: boolean;
};

export type ServiceWithStaffQualification = Service & {
  staffIsQualifiedForService: boolean;
};
