import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { AlertProvider, QueryClientProvider, theme } from '@studiobooker/utils';
import { router } from './router';
import { ThemeProvider } from '@mui/material';
// import { theme } from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AlertProvider>
          <QueryClientProvider>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AlertProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
