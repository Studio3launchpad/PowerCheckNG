export type CommunityStatus = {
  area: string;
  state?: string;

  latitude: number;
  longitude: number;

  reports: number;

  powerOn: number;
  powerOff: number;

  confidence: number;

  status: "Power ON" | "Power OFF";

  lastUpdated: string;
};