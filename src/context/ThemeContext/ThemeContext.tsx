import * as React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeNames, themeMap } from 'styles/theme';

export const ThemeToggleContext = React.createContext({
  theme: ThemeNames.Light,
  setTheme: (_theme: ThemeNames) => {},
});

const ThemeToggleContextProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = React.useState(ThemeNames.Light);

  return (
    <ThemeToggleContext.Provider value={{ setTheme, theme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <ThemeToggleContextProvider>{children}</ThemeToggleContextProvider>;
};

/**@todo use custom provider */
const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { theme } = React.useContext(ThemeToggleContext);
  const themeObject = themeMap[theme];

  return (
    <Wrapper>
      <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
    </Wrapper>
  );
};

export default ThemeProvider;
