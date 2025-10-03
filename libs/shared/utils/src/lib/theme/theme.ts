'use client';

import { createTheme } from '@mui/material';

const defaultTheme = createTheme();

export const theme = createTheme({
  palette: {
    error: { ...defaultTheme.palette.error, light: '#ffebee' },
    primary: {
      main: '#09846d',
      light: '#e4f4f1ff',
      dark: '#09846dff',
      contrastText: '#ecf5f3ff',
    },
    text: {
      primary: 'rgba(58, 58, 58, 0.87)',
      secondary: 'rgba(58, 58, 58, 0.6)',
      disabled: 'rgba(58, 58, 58, 0.38)',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {},
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.light,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 9999, textTransform: 'none' },
        textPrimary: ({ theme }) => ({
          fontWeight: 700,
          '&:hover': {
            backgroundColor: theme.palette.primary.main + 22,
          },
          '&.active': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }),
      },
      variants: [
        { props: { variant: 'outlined' }, style: { borderRadius: 4 } },
        {
          props: { color: 'error' },
          style: {
            borderRadius: 4,
          },
        },
      ],
    },
  },
});
