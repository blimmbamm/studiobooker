import { Box } from "@mui/material";

export default function StaffDetailFallback() {
  return (
    <Box>
      <p>Select staff to see detail...</p>
      <p>
        However, if no staff exists, message should be something else. How to do
        that?
      </p>
    </Box>
  );
}
