export interface FuzzyDataObject {
  value: number[];
  exercise: boolean[];
  fasting: boolean[];
  stress: boolean[];
  medication: boolean[];
}

export enum TrendType {
  Increase = "increase",
  Stabilize = "stabilize",
  Descrease = "decrease",
}
