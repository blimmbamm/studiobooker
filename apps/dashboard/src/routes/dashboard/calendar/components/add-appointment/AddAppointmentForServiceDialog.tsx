import {
  Dialog,
  DialogProps,
  Stepper,
  Step,
  StepLabel,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

import AppointmentServiceSelection from './AppointmentServiceSelection';
import AppointmentStaffSelection from './AppointmentStaffSelection';
import { Service } from '../../../../../types/service';
import { Staff } from '../../../../../types/staff';
import AppointmentDateAndTimeSelection from './AppointmentDateAndTimeSelection';
import AppointmentCustomerSelectionAndSummary from './AppointmentCustomerSelectionAndSummary';

type Props = Omit<DialogProps, 'onClose'> & {
  onClose: () => void;
};

export default function AddAppointmentForServiceDialog({
  onClose,
  ...dialogProps
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Service', 'Staff', 'Date & Time', 'Customer & Summary'];

  const initialAppointment = { service: null, staff: null, date: null };
  const [appointment, setAppointment] = useState<{
    service: Service | null;
    staff: Staff | null;
    date: Dayjs | null;
  }>(initialAppointment);

  function setAppointmentService(service: Service) {
    setAppointment((prevAppointment) => ({ ...prevAppointment, service }));
  }

  function setAppointmentStaff(staff: Staff) {
    setAppointment((prevAppointment) => ({ ...prevAppointment, staff }));
  }

  function setAppointmentDate(date: Dayjs) {
    setAppointment((prevAppointment) => ({ ...prevAppointment, date }));
  }

  function reset() {
    setActiveStep(0);
    setAppointment(initialAppointment);
  }

  function handleClose() {
    onClose?.();
    reset();
  }

  function nextStep() {
    setActiveStep((pStep) => pStep + 1);
  }

  function previousStep() {
    setActiveStep((pStep) => pStep - 1);
  }

  function content() {
    switch (activeStep) {
      case 0:
        return (
          <AppointmentServiceSelection
            selectedService={appointment.service}
            onSelectService={setAppointmentService}
            onNextStep={nextStep}
          />
        );
      case 1:
        return (
          appointment.service && (
            <AppointmentStaffSelection
              selectedService={appointment.service}
              selectedStaff={appointment.staff}
              onSelectStaff={setAppointmentStaff}
              onNextStep={nextStep}
              onPreviousStep={previousStep}
            />
          )
        );
      case 2:
        return (
          <AppointmentDateAndTimeSelection
            selectedService={appointment.service!} // ok since step can only be reached when service is selected
            selectedStaff={appointment.staff!} // same for staff
            selectedDate={appointment.date}
            onSelectDate={setAppointmentDate}
            onNextStep={nextStep}
            onPreviousStep={previousStep}
          />
        );
      case 3:
        return (
          <AppointmentCustomerSelectionAndSummary
            selectedService={appointment.service!}
            selectedStaff={appointment.staff!}
            selectedDate={appointment.date!}
            onPreviousStep={previousStep}
            onFinish={handleClose}
          />
        );
      default:
        return;
    }
  }

  return (
    <Dialog
      {...dialogProps}
      onClose={handleClose}
      fullWidth
      slotProps={{ paper: { sx: { height: '100%', maxWidth: 700 } } }}
    >
      <DialogTitle component="div" display={'flex'} gap={1}>
        <Stepper activeStep={activeStep} sx={{ flex: 1 }}>
          {steps.map((step, index) => (
            <Step key={step} completed={activeStep > index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <IconButton onClick={handleClose} sx={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {content()}
      </DialogContent>
    </Dialog>
  );
}
