import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

const theme = createTheme({
  palette: {
    primary: { main: '#1d4ed8' },
  },
});

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  let tree = children;

  tree = <Provider store={store}>{tree}</Provider>;
  tree = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {tree}
    </ThemeProvider>
  );

  return <>{tree}</>;
}
