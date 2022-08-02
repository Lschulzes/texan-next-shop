export enum CountryCodes {
  USA = "USA",
  CND = "CND",
  MEX = "MEX",
}

export const COUNTRIES: Array<{ name: string; code: `${CountryCodes}` }> = [
  {
    name: "United States",
    code: "USA",
  },
  {
    name: "Canada",
    code: "CND",
  },
  {
    name: "Mexico",
    code: "MEX",
  },
];
