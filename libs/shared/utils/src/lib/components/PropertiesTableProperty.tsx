import { TextField, TextFieldProps, Typography } from '@mui/material';

type Props = { name: string } & TextFieldProps;

export function PropertiesTableProperty({
  name,
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
      />
    </>
  );
}
