import { Service } from "../service";
import { ApiService } from "./service";

export function mapApiToService(service: ApiService): Service {
  return {...service, dingens: false};
}