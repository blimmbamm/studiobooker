import { AppBar, CssBaseline, SxProps, Toolbar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { PropsWithChildren, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollContainerContext } from '../contexts';

type Props = PropsWithChildren & { mainContainerSx?: SxProps };

export function AppBarLayout({ children, mainContainerSx }: Props) {
  const scrollContainerRef = useRef<HTMLElement>(null);

  return (
    <Box display={'flex'} flexDirection={'column'} height={'100dvh'}>
      <CssBaseline />
      <AppBar sx={{ zIndex: 2 }} position="static">
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <ScrollContainerContext.Provider value={scrollContainerRef}>
        <Box
          ref={scrollContainerRef}
          component="main"
          flex={1}
          sx={{
            ...mainContainerSx,
            // scrollbarGutter: 'stable', // alternative for modern browsers
            backgroundColor: grey[100],
          }}
        >
          <Outlet />
        </Box>
      </ScrollContainerContext.Provider>
    </Box>
  );
}
