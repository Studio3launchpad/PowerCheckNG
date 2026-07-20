export type PowerStatus =
  | "POWER_OFF"
  | "POWER_ON"
  | "NOT_SURE";

export type FormValues = {
  area: string;
  discoCode: string;

  rawLatitude: number;
  rawLongitude: number;

  latitude: number;
  longitude: number;

  status: PowerStatus;
  description?: string;
};

export interface Outage {
  id: string;
  area: string;
  discoCode: string;

  rawLatitude?: number;
  rawLongitude?: number;

  latitude: number;
  longitude: number;

  status: PowerStatus;
  confirmations: number;
  startedAt: string;
  description?: string;
}