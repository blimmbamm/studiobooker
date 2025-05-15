import { ApiService } from './service';

export type ApiServiceCategory = {
  id: number;
  name: string;
  services: ApiService[];
};
