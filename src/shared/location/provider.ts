import type {
  LocationRecord,
} from "./types";

export interface LocationProvider {
  search(query: string): Promise<readonly LocationRecord[]>;
  findById(id: string): Promise<LocationRecord | undefined>;
  list(): Promise<readonly LocationRecord[]>;
}
