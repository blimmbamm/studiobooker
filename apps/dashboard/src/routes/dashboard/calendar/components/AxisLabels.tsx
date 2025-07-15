import { BoxProps, TypographyProps, Box, Typography } from '@mui/material';

type Props = { boxProps?: BoxProps; typographyProps?: TypographyProps };

export default function AxisLabels({ boxProps, typographyProps }: Props) {
  return (
    <Box
      height={'100%'}
      width={'40px'}
      position="absolute"
      top={0}
      {...boxProps}
    >
      {Array.from({ length: 23 }, (_, i) => i + 1).map((i) => (
        <Typography
          fontSize={'.75rem'}
          key={i}
          position="absolute"
          lineHeight={1}
          top={i * 60 - 1}
          sx={{ transform: 'translateY(-50%)' }}
          {...typographyProps}
        >
          {i}
        </Typography>
      ))}
    </Box>
  );
}
