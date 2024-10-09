import { Company } from 'constants/auth';

type CompanyMap = Record<Company, string>;

export const color: CompanyMap = {
  [Company.Discord]: '#7289da',
  [Company.Facebook]: '#3C5B96',
  [Company.Twitter]: '#1E99E6',
  [Company.Google]: '#DB4C3F',
  [Company.Linkedin]: '#2789BC',
};

export const hover: CompanyMap = {
  [Company.Discord]: '#7289da',
  [Company.Facebook]: '#304D8A',
  [Company.Twitter]: '#34A1E5',
  [Company.Google]: '#E0321C',
  [Company.Linkedin]: '#147BAF',
};

export default {
  Company,
  color,
  hover,
};
