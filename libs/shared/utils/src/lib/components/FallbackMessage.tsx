import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = { message: string } & TypographyProps;

export function FallbackMessage({ message, ...typographyProps }: Props) {
  return (
    <Typography
      marginTop={'10dvh'}
      textAlign="center"
      variant="h6"
      color={grey[600]}
      {...typographyProps}
    >
      {message}
    </Typography>
  );
}
