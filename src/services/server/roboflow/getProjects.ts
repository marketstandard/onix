import { Project } from 'constants/roboflow';
import api from './apiInstance';

interface Params {
  workspace?: string;
}

export const getProjects = async ({ workspace = '/market-standard' }: Params) => {
  const url = `/${workspace}`;
  const res = await api.get(url);

  const projects: any[] = res.workspace.projects;

  const projectsSanitized: Project[] = projects.map((project) => {
    return {
      id: project.id,
      name: project.name,
      type: project.type,
    };
  });

  return projectsSanitized;
};
