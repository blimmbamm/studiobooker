import {
  Box,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { PropsWithChildren } from 'react';

type Props = {
  name: string;
  asTextField?: boolean;
  propertyValue?: string;
  tooltip?: string | boolean | null;
} & TextFieldProps &
  PropsWithChildren;

export function PropertiesTableProperty({
  name,
  children,
  asTextField = true,
  propertyValue,
  tooltip,
  ...textFieldProps
}: Props) {
  return (
    <>
      <Typography>{name}</Typography>
      <Tooltip title={tooltip}>
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
            minHeight={40}
            display={'flex'}
            minWidth={120}
            alignItems={'center'}
            paddingBlock={1}
            paddingInline={1.75}
            border={'1px solid'}
            borderColor={grey[300]}
            borderRadius={1}
          >
            <Typography lineHeight={1}>{propertyValue}</Typography>
          </Box>
        )}
      </Tooltip>
    </>
  );
}
