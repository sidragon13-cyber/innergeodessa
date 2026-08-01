export interface LocationRecord {
  id: string;
  displayName: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  aliases: readonly string[];
}
