import type { ReactNode } from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { DetailedHTML } from 'constants/html';

export interface ILink extends DetailedHTML<HTMLAnchorElement>, NextLinkProps {
  href: string & NextLinkProps['href'];
  isExternal?: boolean;
  isShallow?: boolean;
  children?: ReactNode;
  target?: HTMLAnchorElement['target'];
  className?: string;
}
