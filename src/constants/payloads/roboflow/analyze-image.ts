import { Prediction } from 'constants/roboflow';

export interface PostRequestPayload {
  sourceImageBase64: string;
  modelId: string;
}

export interface PostResponsePayload {
  predictions: Prediction[];
}
