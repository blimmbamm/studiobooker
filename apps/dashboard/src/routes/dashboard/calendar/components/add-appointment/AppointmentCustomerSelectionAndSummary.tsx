import { Box } from '@mui/material';
import {
  isValidFullEmail,
  isValidPartialEmailOrEmpty,
  PropertiesTableProperty,
} from '@studiobooker/utils';

import { Service } from 'apps/dashboard/src/types/service';
import { Staff } from 'apps/dashboard/src/types/staff';
import { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';
import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { useAddAppointment } from '../../../../../hooks/appointment.queries';
import { AppointmentStatus } from '../../../../../types/appointment';

type Props = {
  selectedService: Service;
  selectedStaff: Staff;
  selectedDate: Dayjs;
} & AddAppointmentStepNavigationProps;

export default function AppointmentCustomerSelectionAndSummary({
  selectedService,
  selectedStaff,
  selectedDate,
  onFinish,
  ...stepNavigationProps
}: Props) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');

  const areInputsValid = customerName && isValidFullEmail(customerEmail);

  const addAppointmentMutation = useAddAppointment({
    onSuccess: () => onFinish?.(),
  });

  function handleChangeCustomerName(event: ChangeEvent<HTMLInputElement>) {
    setCustomerName(event.target.value);
  }

  function handleChangeCustomerEmail(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (isValidPartialEmailOrEmpty(value)) {
      setCustomerEmail(value);
    }
  }

  function handleChangeNotes(event: ChangeEvent<HTMLInputElement>) {
    setNotes(event.target.value);
  }

  function handleAddAppointment() {
    onFinish?.();

    if (selectedService.duration) {
      addAppointmentMutation.mutate({
        dto: {
          start: selectedDate,
          duration: selectedService.duration,
          status: AppointmentStatus.CONFIRMED,
          title: `Appt: ${selectedService.title}`, // could be extended
          notes,
          customerName,
          customerEmail,
          serviceId: selectedService.id,
          staffId: selectedStaff.id,
        },
      });
    }
  }

  return (
    <>
      <Box flex={1} overflow={'auto'}>
        <Box
          display={'grid'}
          gridTemplateColumns={'auto auto'}
          alignItems={'center'}
          rowGap={1}
          columnGap={3}
          width={'fit-content'}
          margin={'auto'}
        >
          <PropertiesTableProperty
            name="Service"
            propertyValue={selectedService.title}
            asTextField={false}
          />
          <PropertiesTableProperty
            name="Staff"
            propertyValue={selectedStaff.name}
            asTextField={false}
          />
          <PropertiesTableProperty
            name="Date"
            propertyValue={selectedDate.format('ddd, DD MMM YYYY HH:mm')}
            asTextField={false}
          />
          <PropertiesTableProperty
            name="Duration"
            propertyValue={`${selectedService.duration?.toString()} min`}
            asTextField={false}
          />
          <PropertiesTableProperty
            name="Price"
            propertyValue={`${selectedService.price?.toString()} €`}
            asTextField={false}
          />
          <PropertiesTableProperty
            name="Customer name"
            value={customerName}
            onChange={handleChangeCustomerName}
            autoFocus
          />
          <PropertiesTableProperty
            name="Customer e-mail"
            value={customerEmail}
            onChange={handleChangeCustomerEmail}
          />
          <PropertiesTableProperty
            name="Notes"
            multiline
            value={notes}
            onChange={handleChangeNotes}
          />
        </Box>
      </Box>
      <AddAppointmentStepNavigation
        {...stepNavigationProps}
        onFinish={handleAddAppointment}
        finishDisabled={!areInputsValid}
      />
    </>
  );
}
