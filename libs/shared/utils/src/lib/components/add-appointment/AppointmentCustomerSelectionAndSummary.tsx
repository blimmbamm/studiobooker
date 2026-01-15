import { ChangeEvent, useState } from 'react';
import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';

import AddAppointmentStepNavigation, {
  AddAppointmentStepNavigationProps,
} from './AddAppointmentStepNavigation';
import { Service } from '../../types';
import { Staff } from '../../types/api/staff/staff';
import { isValidFullEmail, isValidPartialEmailOrEmpty } from '../../validation';
import { PropertiesTableProperty } from '../PropertiesTableProperty';
import { AppointmentData } from './AddAppointmentForServiceDialog';

type Props = {
  selectedService: Service;
  selectedStaff: Staff;
  selectedDate: Dayjs;
  onAddAppointment: (args: AppointmentData) => void;
  isSubmittingAppointment: boolean;
} & AddAppointmentStepNavigationProps;

export default function AppointmentCustomerSelectionAndSummary({
  selectedService,
  selectedStaff,
  selectedDate,
  onAddAppointment,
  onFinish,
  isSubmittingAppointment,
  ...stepNavigationProps
}: Props) {
  console.log(selectedDate)
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');

  const areInputsValid = customerName && isValidFullEmail(customerEmail);

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
    onAddAppointment({
      service: selectedService,
      staff: selectedStaff,
      date: selectedDate,
      notes,
      customerEmail,
      customerName,
    });
  }

  return (
    <>
      <Box flex={1} overflow={'auto'}>
        <Box
          display={'grid'}
          gridTemplateColumns={'max-content auto'}
          alignItems={'center'}
          rowGap={1}
          columnGap={3}
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
        finishLoading={isSubmittingAppointment}
      />
    </>
  );
}
