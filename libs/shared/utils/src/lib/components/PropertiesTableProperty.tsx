import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = {
  name: string;
  asTextField?: boolean;
  propertyValue?: string;
} & TextFieldProps &
  PropsWithChildren;

export function PropertiesTableProperty({
  name,
  children,
  asTextField = true,
  propertyValue,
  ...textFieldProps
}: Props) {
  return (
    <>
      <Typography>{name}</Typography>
      {asTextField ? (
        <TextField
          variant="outlined"
          size="small"
          autoComplete="off"
          {...textFieldProps}
        >
          {children}
        </TextField>
      ) : (
        <Box
          height={40}
          display={'flex'}
          alignItems={'center'}
          // paddingBlock={1.0625} // this would be 8.5 (depending on spacing)
          paddingInline={1.75}
        >
          <Typography>{propertyValue}</Typography>
        </Box>
      )}
    </>
  );
}
