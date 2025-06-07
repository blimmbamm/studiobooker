import { Company } from '../company';
import { ApiCompany } from './company';

export function mapApiToCompany(data: ApiCompany): Company {
  return data;
}
