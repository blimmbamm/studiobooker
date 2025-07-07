import { ApiCompanyInfo } from "./company-info";
import { ApiWorkingTimeSetting } from "./working-time-setting";

export type ApiCompany = {
  id: number;
  email: string;
};

export type ApiCompanyStructured = ApiCompany & {
  companyInfo: ApiCompanyInfo;
  workingTimeSettings: ApiWorkingTimeSetting[];
}