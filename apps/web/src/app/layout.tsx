import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Button } from '@mui/material';
import { AppBarLayout } from '@studiobooker/utils';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppBarLayout mainContent={children}>
            <Button component={Link} href={''} color="inherit">
              Studiobooker
            </Button>
            <Button component={Link} href={''} color="inherit">
              Example studio
            </Button>
            <Button component={Link} href={''} color="inherit">
              Get studiobooker
            </Button>
          </AppBarLayout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
