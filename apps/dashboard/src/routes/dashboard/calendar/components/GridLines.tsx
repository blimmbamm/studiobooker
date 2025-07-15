import { Box, BoxProps } from '@mui/material';

type Props = { nCols: number; gridImageHeight: string } & BoxProps;

export default function GridLines({
  nCols,
  gridImageHeight,
  ...boxProps
}: Props) {
  return (
    <Box
      position="absolute"
      top={0}
      left={5 * 8}
      right={5 * 8}
      bottom={0}
      sx={{
        backgroundImage: (theme) => `
          linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
          linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)`,
        backgroundSize: `calc((100% - 40px) / ${nCols}) ${gridImageHeight}`, // 100% refers to width of element itself, not parent
        backgroundPosition: '20px -1px',
      }}
      {...boxProps}
    />
  );
}
