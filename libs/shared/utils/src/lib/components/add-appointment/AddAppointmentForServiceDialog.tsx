'use client';

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
import AppointmentDateAndTimeSelection from './AppointmentDateAndTimeSelection';
import AppointmentCustomerSelectionAndSummary from './AppointmentCustomerSelectionAndSummary';
import { Service } from '../../types';
import { Staff } from '../../types/api/staff/staff';
import { ServiceCategoryStructured } from '../../types/api/service-category/service-category';
import { AvailableAppointmentSlots } from '../../types/api/appointment-slot/appointment-slot';

export type ServicesByCategoryQuery = () => {
  serviceCategories?: ServiceCategoryStructured[];
  noServices?: boolean;
  isError?: boolean;
  isLoading?: boolean;
};

export type StaffQuery = (service: Service) => {
  staff?: Staff[];
  noStaff?: boolean;
  isError?: boolean;
  isLoading?: boolean;
};

export type AvailableAppointmentSlotsQuery = (args: {
  service: Service;
  staff: Staff;
  start: Dayjs;
}) => {
  slots?: AvailableAppointmentSlots[];
  noSlots?: boolean;
  isPending?: boolean;
  isError?: boolean;
};

export type AppointmentData = {
  service: Service;
  staff: Staff;
  date: Dayjs;
  notes: string;
  customerEmail: string;
  customerName: string;
};

type Props = Omit<DialogProps, 'onClose'> & {
  initialService?: Service | null;
  initialStep?: number;
  stepFilter: (label: string) => boolean;
  servicesByCategoryQuery: ServicesByCategoryQuery;
  staffQuery: StaffQuery;
  availableAppointmentSlotsQuery: AvailableAppointmentSlotsQuery;
  onClose: () => void;
  onAddAppointment: (args: {
    appointmentData: AppointmentData;
    onSuccess: () => void;
  }) => void;
  isSubmittingAppointment: boolean;
};

export function AddAppointmentForServiceDialog({
  onClose,
  servicesByCategoryQuery,
  staffQuery,
  availableAppointmentSlotsQuery,
  onAddAppointment,
  isSubmittingAppointment,
  initialStep,
  initialService = null,
  stepFilter,
  ...dialogProps
}: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const initialAppointment = {
    service: initialService,
    staff: null,
    date: null,
  };
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

  const steps = [
    {
      label: 'Service',
      content: (
        <AppointmentServiceSelection
          selectedService={appointment.service}
          servicesByCategoryQuery={servicesByCategoryQuery}
          onSelectService={setAppointmentService}
          onNextStep={nextStep}
        />
      ),
    },
    {
      label: 'Staff',
      content: appointment.service && (
        <AppointmentStaffSelection
          selectedService={appointment.service}
          selectedStaff={appointment.staff}
          staffQuery={staffQuery}
          onSelectStaff={setAppointmentStaff}
          onNextStep={nextStep}
          onPreviousStep={initialService ? undefined : previousStep}
        />
      ),
    },
    {
      label: 'Date & Time',
      content: appointment.service && appointment.staff && (
        <AppointmentDateAndTimeSelection
          selectedService={appointment.service}
          selectedStaff={appointment.staff}
          selectedDate={appointment.date}
          availableAppointmentSlotsQuery={availableAppointmentSlotsQuery}
          onSelectDate={setAppointmentDate}
          onNextStep={nextStep}
          onPreviousStep={previousStep}
        />
      ),
    },
    {
      label: 'Customer & Summary',
      content: appointment.service && appointment.staff && appointment.date && (
        <AppointmentCustomerSelectionAndSummary
          selectedService={appointment.service}
          selectedStaff={appointment.staff}
          selectedDate={appointment.date}
          onPreviousStep={previousStep}
          onAddAppointment={(appointmentData) =>
            onAddAppointment({ appointmentData, onSuccess: reset })
          }
          isSubmittingAppointment={isSubmittingAppointment}
        />
      ),
    },
  ].filter(({ label }) => stepFilter(label));

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
            <Step key={step.label} completed={activeStep > index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <IconButton onClick={handleClose} sx={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {steps[activeStep].content}
      </DialogContent>
    </Dialog>
  );
}
