import React, { FunctionComponent } from 'react';
import NextLink from 'next/link';
import classNames from 'styles/utils/classNames';
import type { ILink } from './types';

/**
 * @todo wait for design to see if need to add variants, etc
 */
const Link: FunctionComponent<ILink> = ({
  isExternal = false,
  isShallow = false,
  href,
  className,
  children,
  ...rest
}) =>
  isExternal ? (
    <a href={href} className={classNames(className)} target="_blank" {...rest}>
      {children}
    </a>
  ) : (
    <NextLink className={classNames('link', className)} shallow={isShallow} href={href} {...rest}>
      {children}
    </NextLink>
  );

export default Link;
