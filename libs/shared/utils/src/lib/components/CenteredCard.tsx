import { Box, Card, CardProps } from '@mui/material';

/**
 * Horizontally centered card, vertically 2/3 space below, 1/3 above
 */
export function CenteredCard({ children, sx, ...rest }: CardProps) {
  return (
    <>
      <Box flex={1} />
      <Card
        sx={{ padding: 2, width: 'fit-content', margin: 'auto', ...sx }}
        {...rest}
      >
        {children}
      </Card>
      <Box flex={2} />
    </>
  );
}
