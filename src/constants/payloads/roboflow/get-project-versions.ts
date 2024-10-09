import { Version } from 'constants/roboflow';

export interface PostRequestPayload {
  projectId: string;
}

export interface PostResponsePayload {
  versions: Version[];
}
