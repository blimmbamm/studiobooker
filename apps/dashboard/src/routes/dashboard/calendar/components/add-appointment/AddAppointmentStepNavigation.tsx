import { Box, Button } from '@mui/material';

export type AddAppointmentStepNavigationProps = {
  onPreviousStep?: () => void;
  onNextStep?: () => void;
  onFinish?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  finishDisabled?: boolean;
};

export default function AddAppointmentStepNavigation({
  onPreviousStep,
  onNextStep,
  onFinish,
  previousDisabled,
  nextDisabled,
  finishDisabled,
}: AddAppointmentStepNavigationProps) {
  return (
    <Box display="flex">
      {onPreviousStep && (
        <Button onClick={onPreviousStep} disabled={previousDisabled}>
          Back
        </Button>
      )}
      <Box flex={1} />
      {onNextStep && (
        <Button onClick={onNextStep} disabled={nextDisabled}>
          Next
        </Button>
      )}
      {onFinish && (
        <Button onClick={onFinish} disabled={finishDisabled}>
          Finish
        </Button>
      )}
    </Box>
  );
}
