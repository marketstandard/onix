import { Prediction } from 'constants/roboflow';
import api, { parameterizedAuth } from './detectInstance';

interface Params {
  image: string;
  modelId: string;
}

export const analyzeImage = async ({ image, modelId }: Params) => {
  const url = `/${modelId}?${parameterizedAuth}`;

  const res = await api.post(url, {
    body: image,
  });

  return res.predictions as Prediction[];
};
