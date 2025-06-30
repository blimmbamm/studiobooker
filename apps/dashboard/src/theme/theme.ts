import { createTheme } from '@mui/material';

const defaultTheme = createTheme();

export const theme = createTheme({
  palette: { error: { ...defaultTheme.palette.error, light: '#ffebee' } },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 9999 } },
      variants: [
        {
          props: { color: 'error' },
          style: {
            borderRadius: 4, // or use theme.shape.borderRadius
          },
        },
      ],
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     rounded: ({ theme }) => ({
    //       borderRadius: 12,
    //       borderWidth: 1,
    //       borderStyle: 'solid',
    //       borderColor: theme.palette.divider,
    //     }),
    //   },
    // },
  },
});
