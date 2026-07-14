export type CommunityPowerStatus =
  | "Power ON"
  | "Power OFF"
  | "Needs Confirmation";

export type CommunityStatus = {
  area: string;
  state?: string;

  latitude: number;
  longitude: number;

  reports: number;

  powerOn: number;
  powerOff: number;
  notSure: number;

  confidence: number;

  status: CommunityPowerStatus;

  lastUpdated: string;
};