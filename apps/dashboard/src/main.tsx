import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material';

import {
  AlertProvider,
  initClient,
  QueryClientProvider,
  theme,
} from '@studiobooker/utils';
import { router } from './router';

initClient(import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:3001');

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
