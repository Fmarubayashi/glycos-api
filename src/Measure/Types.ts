export interface FuzzyDataObject {
  value: number[];
  exercise: boolean[];
  fasting: boolean[];
  stress: boolean[];
  medication: boolean[];
}

export enum TrendType {
  Descrease = 1,
  Stabilize = 2,
  Increase = 3,
}
