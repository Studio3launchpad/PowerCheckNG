export type FormValues = {
  area: string;
  discoCode: string;
  latitude: number;
  longitude: number;
  description?: string;
};

export type OutageStatus =
  | "REPORTED"
  | "CONFIRMED"
  | "RESTORED"
  | "CANCELLED";

export interface Outage {
  id: string;
  area: string;
  discoCode: string;
  latitude: number;
  longitude: number;
  status: OutageStatus;
  confirmations: number;
  startedAt: string;
  description?: string;
}