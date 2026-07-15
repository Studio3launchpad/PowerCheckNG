export type KnownArea = {
  area: string;
  state: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
  discoCode: string;
};

export const KNOWN_AREAS: KnownArea[] = [
  /*
 * Federal Capital Territory
 */
{
  area: "Lugbe",
  state: "Federal Capital Territory",
  latitude: 8.9796,
  longitude: 7.3678,
  radiusKm: 5,
  discoCode: "AEDC",
},
{
  area: "Wuse",
  state: "Federal Capital Territory",
  latitude: 9.0765,
  longitude: 7.4677,
  radiusKm: 4,
  discoCode: "AEDC",
},
{
  area: "Gwarinpa",
  state: "Federal Capital Territory",
  latitude: 9.1099,
  longitude: 7.4042,
  radiusKm: 5,
  discoCode: "AEDC",
},
{
  area: "Kubwa",
  state: "Federal Capital Territory",
  latitude: 9.1538,
  longitude: 7.322,
  radiusKm: 5,
  discoCode: "AEDC",
},

  /*
 * Lagos State
 */
{
  area: "Ikeja",
  state: "Lagos State",
  latitude: 6.6018,
  longitude: 3.3515,
  radiusKm: 4,
  discoCode: "IKEDC",
},
{
  area: "Lekki",
  state: "Lagos State",
  latitude: 6.4698,
  longitude: 3.5852,
  radiusKm: 5,
  discoCode: "EKEDC",
},
{
  area: "Yaba",
  state: "Lagos State",
  latitude: 6.5158,
  longitude: 3.3707,
  radiusKm: 3,
  discoCode: "EKEDC",
},
{
  area: "Surulere",
  state: "Lagos State",
  latitude: 6.4969,
  longitude: 3.3531,
  radiusKm: 4,
  discoCode: "EKEDC",
},
{
  area: "Ikorodu",
  state: "Lagos State",
  latitude: 6.6194,
  longitude: 3.5105,
  radiusKm: 5,
  discoCode: "IKEDC",
},
{
  area: "Ajah",
  state: "Lagos State",
  latitude: 6.4692,
  longitude: 3.5615,
  radiusKm: 4,
  discoCode: "EKEDC",
},
{
  area: "Victoria Island",
  state: "Lagos State",
  latitude: 6.4281,
  longitude: 3.4219,
  radiusKm: 4,
  discoCode: "EKEDC",
},
{
  area: "Ikoyi",
  state: "Lagos State",
  latitude: 6.4541,
  longitude: 3.4346,
  radiusKm: 4,
  discoCode: "EKEDC",
},
{
  area: "Epe",
  state: "Lagos State",
  latitude: 6.5841,
  longitude: 3.9834,
  radiusKm: 6,
  discoCode: "EKEDC",
},
{
  area: "Ajegunle",
  state: "Lagos State",
  latitude: 6.4553,
  longitude: 3.3374,
  radiusKm: 4,
  discoCode: "EKEDC",
},
{
  area: "Mushin",
  state: "Lagos State",
  latitude: 6.5273,
  longitude: 3.3414,
  radiusKm: 4,
  discoCode: "EKEDC",
},
{
  area: "Oshodi",
  state: "Lagos State",
  latitude: 6.555,
  longitude: 3.3433,
  radiusKm: 4,
  discoCode: "IKEDC",
},

  /*
   * Oyo State
   */
  {
    area: "Bodija",
    state: "Oyo State",
    latitude: 7.4351,
    longitude: 3.9085,
    radiusKm: 5,
    discoCode: "IBEDC",
  },
  {
    area: "Challenge",
    state: "Oyo State",
    discoCode: "IBEDC",
    latitude: 7.3476,
    longitude: 3.8754,
    radiusKm: 5,
  },
  {
    area: "Akobo",
    state: "Oyo State",
    discoCode: "IBEDC",
    latitude: 7.4426,
    longitude: 3.9478,
    radiusKm: 5,
  },
  {
    area: "Beere",
    state: "Oyo State",
    discoCode: "IBEDC",
    latitude: 7.3872,
    longitude: 3.8967,
    radiusKm: 6,
  },
  {
    area: "Oluyole",
    state: "Oyo State",
    discoCode: "IBEDC",
    latitude: 7.3227,
    longitude: 3.8624,
    radiusKm: 6,
  },
  {
    area: "Agodi",
    state: "Oyo State",
    discoCode: "IBEDC",
    latitude: 7.4095,
    longitude: 3.9019,
    radiusKm: 6,
  },
  {
    area: "Dugbe",
    state: "Oyo State",
    
    discoCode: "IBEDC",
    latitude: 7.3877,
    longitude: 3.8797,
    radiusKm: 6,
  },
  {
    area: "University of Ibadan",
    state: "Oyo State",
    
    discoCode: "IBEDC",
    latitude: 7.4417,
    longitude: 3.9003,
    radiusKm: 6,
  },

  /*
   * Ogun State
   */
  {
    area: "Abeokuta",
    state: "Ogun State",
  
    discoCode: "IBEDC",
    latitude: 7.1475,
    longitude: 3.3619,
    radiusKm: 6,
  },
  {
    area: "Ota",
    state: "Ogun State",
    
    discoCode: "IBEDC",
    latitude: 6.6833,
    longitude: 3.2,
    radiusKm: 5,
  },
  {
    area: "Sagamu",
    state: "Ogun State",
    
    discoCode: "IBEDC",
    latitude: 6.8485,
    longitude: 3.6463,
    radiusKm: 5,
  },
  {
    area: "Ijebu-Ode",
    state: "Ogun State",
    
    discoCode: "IBEDC",
    latitude: 6.8206,
    longitude: 3.9173,
    radiusKm: 5,
  },
  {
    area: "Ilaro",
    state: "Ogun State",
    
    discoCode: "IBEDC",
    latitude: 6.889,
    longitude: 3.0142,
    radiusKm: 5,
  },

  /*
   * Osun State
   */
  {
    area: "Osogbo",
    state: "Osun State",
    
    discoCode: "IBEDC",
    latitude: 7.7827,
    longitude: 4.5418,
    radiusKm: 6,
  },
  {
    area: "Ile-Ife",
    state: "Osun State",
    
    discoCode: "IBEDC",
    latitude: 7.4905,
    longitude: 4.5521,
    radiusKm: 6,
  },
  {
    area: "Ilesa",
    state: "Osun State",
    
    discoCode: "IBEDC",
    latitude: 7.6167,
    longitude: 4.7333,
    radiusKm: 5,
  },
  {
    area: "Iwo",
    state: "Osun State",
    
    discoCode: "IBEDC",
    latitude: 7.6292,
    longitude: 4.1872,
    radiusKm: 6,
  },
  {
    area: "Ede",
    state: "Osun State",
  
    discoCode: "IBEDC",
    latitude: 7.7363,
    longitude: 4.4354,
    radiusKm: 6,
  },
  {
    area: "Ejigbo",
    state: "Osun State",
    
    discoCode: "IBEDC",
    latitude: 7.9029,
    longitude: 4.3142,
    radiusKm: 6,
  },

  /*
   * Ondo State
   */
  {
    area: "Akure",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 7.2571,
    longitude: 5.2058,
    radiusKm: 6,
  },
  {
    area: "Ondo Town",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 7.1,
    longitude: 4.8333,
    radiusKm: 6,
  },
  {
    area: "Ore",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 6.7472,
    longitude: 4.8761,
    radiusKm: 6,
  },
  {
    area: "Owo",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 7.1962,
    longitude: 5.5868,
    radiusKm: 6,
  },
  {
    area: "Okitipupa",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 6.5049,
    longitude: 4.7795,
    radiusKm: 6,
  },
  {
    area: "Ikare-Akoko",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 7.5259,
    longitude: 5.7534,
    radiusKm: 6,
  },
  {
    area: "Akungba-Akoko",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 7.4744,
    longitude: 5.7356,
    radiusKm: 6,
  },
  {
    area: "Idanre",
    state: "Ondo State",
    
    discoCode: "BEDC",
    latitude: 7.1127,
    longitude: 5.1159,
    radiusKm: 6,
  },

  /*
   * Ekiti State
   */
  {
    area: "Ado-Ekiti",
    state: "Ekiti State",
    
    discoCode: "BEDC",
    latitude: 7.6233,
    longitude: 5.2209,
    radiusKm: 6,
  },
  {
    area: "Ikere-Ekiti",
    state: "Ekiti State",
    
    discoCode: "BEDC",
    latitude: 7.4975,
    longitude: 5.2304,
    radiusKm: 6,
  },
  {
    area: "Ikogosi-Ekiti",
    state: "Ekiti State",
    
    discoCode: "BEDC",
    latitude: 7.5904,
    longitude: 4.9795,
    radiusKm: 6,
  },
  {
    area: "Ikole-Ekiti",
    state: "Ekiti State",
    
    discoCode: "BEDC",
    latitude: 7.7983,
    longitude: 5.5145,
    radiusKm: 6,
  },
  {
    area: "Omuo-Ekiti",
    state: "Ekiti State",
    
    discoCode: "BEDC",
    latitude: 7.7583,
    longitude: 5.7223,
    radiusKm: 6,
  },
];