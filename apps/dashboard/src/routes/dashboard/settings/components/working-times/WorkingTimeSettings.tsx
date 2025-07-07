import { Box, Typography } from '@mui/material';
import { TableSection } from '@studiobooker/utils';
import { CompanyStructured } from '../../../../../types/company';
import { WEEKDAYS } from '../../../../../constants/weekdays';
import WorkingTimeSettingSkeleton from './WorkingTimeSettingSkeleton';
import WorkingTimeSetting from './WorkingTimeSetting';

type Props = { company?: CompanyStructured };

export default function WorkingTimeSettings({ company }: Props) {
  return (
    <TableSection
      title="Default working times"
      columns={3}
      tableSx={{ width: 'fit-content', rowGap: 1 }}
    >
      <Box />
      <Typography textAlign="center">From</Typography>
      <Typography textAlign="center">To</Typography>
      {!company && (
        <>
          {WEEKDAYS.map((wt) => (
            <WorkingTimeSettingSkeleton key={wt} weekday={wt} />
          ))}
        </>
      )}
      {company &&
        company.workingTimeSettings.map((wt) => (
          <WorkingTimeSetting key={wt.id} workingTimeSetting={wt} />
        ))}
    </TableSection>
  );
}
