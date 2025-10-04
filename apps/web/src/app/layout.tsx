import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, ThemeProvider } from '@mui/material';
import { AppBarLayout, NavButton, theme } from '@studiobooker/utils';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'Studiobooker | %s',
    default: 'Studiobooker',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppBarLayout
              mainContainerSx={{ overflowY: 'auto' }}
              mainContent={
                <Box
                  display={'flow-root'}
                  maxWidth={800}
                  height={'100%'}
                  margin="auto"
                  sx={{ backgroundColor: 'white' }}
                >
                  {children}
                </Box>
              }
            >
              <NavButton component={Link} href={'/'}>
                Studiobooker
              </NavButton>
              <NavButton
                component={Link}
                href={`/${process.env.EXAMPLE_STUDIO_ID}`}
              >
                Example studio
              </NavButton>
              <NavButton
                component={Link}
                href={process.env.URL_DASHBOARD}
                target="_blank"
              >
                Get studiobooker
              </NavButton>
            </AppBarLayout>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
