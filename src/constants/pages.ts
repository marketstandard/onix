export const ROOT_PAGE = '/';
export const CLIENT_PORTAL_PAGE = '/dashboard';
export const MARKET_PLACE_PAGE = '/marketplace';
export const HOME_PAGE = CLIENT_PORTAL_PAGE;
export const ABOUT_PAGE = '/about';
export const BLOG_PAGE = '/blog';
export const FORGOT_PASSWORD_PAGE = '/forgot-password';
export const LOGOUT_PAGE = '/logout';
export const LOGIN_PAGE = '/login';
export const SIGNUP_PAGE = '/signup';
export const PERSONAL_ROUTES_ROOT = '/my';

export const MY_SETTINGS_PAGE = `${PERSONAL_ROUTES_ROOT}/settings`;
/**
 * @note we'll likely eventually move to /org/{id}/team
 */
export const MY_TEAM_PAGE = `${MY_SETTINGS_PAGE}/team`;
export const API_PAGE = `${MY_SETTINGS_PAGE}/api`;
export const FILE_UPLOAD_PAGE = `${MY_SETTINGS_PAGE}/file-upload`;

export enum SettingsTab {
  Account = 'account',
  Billing = 'billing',
  Team = 'team',
  Applications = 'applications',
}
export interface SettingsLink {
  text: string;
  href: string;
}

export const SETTINGS_PAGES: SettingsLink[] = [
  {
    text: 'API Keys and Usage',
    href: API_PAGE,
  },
  {
    text: 'Secure File Upload',
    href: FILE_UPLOAD_PAGE,
  },
];

export const DASHBOARD_TABS = [
  {
    text: 'Dashboard',
    href: CLIENT_PORTAL_PAGE,
  },
  {
    text: 'API Keys & Usage',
    href: API_PAGE,
  },
  {
    text: 'My Files',
    href: FILE_UPLOAD_PAGE,
  },
  {
    text: 'Marketplace',
    href: MARKET_PLACE_PAGE,
  },
  {
    text: 'Settings',
    href: MY_SETTINGS_PAGE,
  },
];

export type SidenavPages = {
  name: string;
  Icon: React.ElementType;
  subPages?: { name: string; href: string; isActive?: boolean }[];
  activePage?: string;
};
