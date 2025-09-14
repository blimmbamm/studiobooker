import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, Button, ThemeProvider } from '@mui/material';
import { AppBarLayout, theme } from '@studiobooker/utils';
import Link from 'next/link';

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
              <Button component={Link} href={'/'} color="inherit">
                Studiobooker
              </Button>
              <Button
                component={Link}
                href={`/${process.env.EXAMPLE_STUDIO_ID}`}
                color="inherit"
              >
                Example studio
              </Button>
              <Button
                component={Link}
                href={process.env.URL_DASHBOARD}
                target="_blank"
                color="inherit"
              >
                Get studiobooker
              </Button>
            </AppBarLayout>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
