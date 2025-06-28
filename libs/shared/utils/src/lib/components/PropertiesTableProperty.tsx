import { TextField, TextFieldProps, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = { name: string } & TextFieldProps & PropsWithChildren;

export function PropertiesTableProperty({
  name,
  children,
  ...textFieldProps
}: Props) {
  return (
    <>
      <Typography>{name}</Typography>
      <TextField
        variant="outlined"
        size="small"
        autoComplete="off"
        {...textFieldProps}
      >
        {children}
      </TextField>
    </>
  );
}
