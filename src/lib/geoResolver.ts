export type GeoArea = {
  area: string;
  state: string;
  lga: string;
  discoCode: string;

  latMin: number;
  latMax: number;

  lngMin: number;
  lngMax: number;
};

const AREAS: GeoArea[] = [
  // ======================
  // ABUJA (Development)
  // ======================

  {
  area: "Lugbe",
  state: "Federal Capital Territory",
  lga: "Abuja Municipal",
  discoCode: "AEDC",

  latMin: 8.93,
  latMax: 9.03,

  lngMin: 7.30,
  lngMax: 7.42,
},

{
  area: "Wuse",
  state: "Federal Capital Territory",
  lga: "Abuja Municipal",
  discoCode: "AEDC",

  latMin: 9.03,
  latMax: 9.10,

  lngMin: 7.42,
  lngMax: 7.50,
},

{
  area: "Gwarinpa",
  state: "Federal Capital Territory",
  lga: "Abuja Municipal",
  discoCode: "AEDC",

  latMin: 9.08,
  latMax: 9.16,

  lngMin: 7.33,
  lngMax: 7.43,
},

  // ======================
  // LAGOS
  // ======================

  {
    area: "Ikeja",
    state: "Lagos",
    lga: "Ikeja",
    discoCode: "IKEDC",

    latMin: 6.56,
    latMax: 6.63,

    lngMin: 3.32,
    lngMax: 3.40,
  },

  {
    area: "Lekki",
    state: "Lagos",
    lga: "Eti-Osa",
    discoCode: "EKEDC",

    latMin: 6.42,
    latMax: 6.48,

    lngMin: 3.50,
    lngMax: 3.58,
  },

  {
    area: "Yaba",
    state: "Lagos",
    lga: "Lagos Mainland",
    discoCode: "EKEDC",

    latMin: 6.49,
    latMax: 6.52,

    lngMin: 3.36,
    lngMax: 3.39,
  },
];

const DEFAULT_LOCATION = null;

export function resolveLocation(
  latitude: number,
  longitude: number,
) {
  return (
    AREAS.find(
      (area) =>
        latitude >= area.latMin &&
        latitude <= area.latMax &&
        longitude >= area.lngMin &&
        longitude <= area.lngMax
    ) ?? DEFAULT_LOCATION
  );
}