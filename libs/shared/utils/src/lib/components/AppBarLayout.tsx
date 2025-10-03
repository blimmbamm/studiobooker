import { AppBar, CssBaseline, SxProps, Toolbar } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Fragment, PropsWithChildren, ReactNode, RefObject } from 'react';

type Props = PropsWithChildren & {
  mainContent: ReactNode;
  mainContainerSx?: SxProps;
  mainContentWrapper?: (props: PropsWithChildren) => ReactNode;
  mainContentRef?: RefObject<HTMLElement | null>;
};

export function AppBarLayout({
  children,
  mainContent,
  mainContainerSx,
  mainContentWrapper: MainContentWrapper = Fragment,
  mainContentRef,
}: Props) {
  return (
    <Box display={'flex'} flexDirection={'column'} height={'100dvh'}>
      <CssBaseline />
      <AppBar sx={{ zIndex: 2 }} position="static">
        <Toolbar sx={{ gap: 1, justifyContent: 'center' }}>{children}</Toolbar>
      </AppBar>
      <MainContentWrapper>
        <Box
          ref={mainContentRef}
          component="main"
          flex={1}
          sx={{
            ...mainContainerSx,
            // scrollbarGutter: 'stable', // alternative for modern browsers
            backgroundColor: grey[100],
          }}
        >
          {mainContent}
        </Box>
      </MainContentWrapper>
    </Box>
  );
}
