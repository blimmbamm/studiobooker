import { ApiCompanyInfo } from "./company-info";
import { ApiWorkingTime } from "./working-time";

export type ApiCompany = {
  id: number;
  email: string;
};

export type ApiCompanyStructured = ApiCompany & {
  companyInfo: ApiCompanyInfo;
  workingTimeSettings: ApiWorkingTime[];
}