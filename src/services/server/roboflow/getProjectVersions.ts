import { Version } from 'constants/roboflow';
import api from './apiInstance';

interface Params {
  projectId: string;
}

export const getProjectVersions = async ({ projectId }: Params): Promise<Version[]> => {
  const url = `/${projectId}`;
  const res = await api.get(url);

  const versions: any[] = res.versions;

  const versionsSanitized: Version[] = versions.map((ver) => {
    return {
      id: ver.id,
      name: ver.id.split('/').pop(),
      map: parseFloat(ver.model?.map) || NaN,
      recall: parseFloat(ver.model?.recall) || NaN,
      precision: parseFloat(ver.model?.precision) || NaN,
    };
  });

  return versionsSanitized;
};
