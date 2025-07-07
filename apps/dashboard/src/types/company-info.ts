export type CompanyInfo = {
  id: number;
  name: string | null;
  description: string | null;
};

export type EditCompanyInfoDto = {
  name?: string | null;
  description?: string | null;
};
