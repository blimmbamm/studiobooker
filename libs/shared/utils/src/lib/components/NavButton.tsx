import { To } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';

type Props = {
  to?: To;
} & ButtonProps;

export function NavButton({
  children,
  component = 'button',
  to,
  ...otherProps
}: Props) {
  return (
    <Button
      component={component}
      sx={{ fontSize: 'large', paddingInline: 3 }}
      {...otherProps}
      to={to}
    >
      {children}
    </Button>
  );
}
