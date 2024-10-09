export enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Options = 'OPTIONS',
}

export interface LinkProps {
  href?: string;
  hrefAs?: string;
  text?: string;
}

export const EMPTY_LINK_PROPS: LinkProps = {
  href: '',
  hrefAs: '',
  text: '',
};
