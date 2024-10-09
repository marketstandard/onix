export interface Project {
  id: string;
  type: string;
  name: string;
}

export interface Version {
  id: string;
  name: string;
  map: number;
  recall: number;
  precision: number;
}

export interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
}
