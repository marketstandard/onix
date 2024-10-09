import React, { FunctionComponent, PropsWithChildren } from 'react';
import ThemeProviderWrapper from './ThemeContext';

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <ThemeProviderWrapper>
    <>{children}</>
  </ThemeProviderWrapper>
);
