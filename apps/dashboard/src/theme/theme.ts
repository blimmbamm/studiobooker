import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 9999 } },
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
