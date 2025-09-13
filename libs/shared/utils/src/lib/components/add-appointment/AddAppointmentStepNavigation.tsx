import { Box, Button } from '@mui/material';

export type AddAppointmentStepNavigationProps = {
  onPreviousStep?: () => void;
  onNextStep?: () => void;
  onFinish?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  finishDisabled?: boolean;
  finishLoading?: boolean;
};

export default function AddAppointmentStepNavigation({
  onPreviousStep,
  onNextStep,
  onFinish,
  previousDisabled,
  nextDisabled,
  finishDisabled,
  finishLoading,
}: AddAppointmentStepNavigationProps) {
  return (
    <Box display="flex" paddingTop={1}>
      {onPreviousStep && (
        <Button
          variant="contained"
          onClick={onPreviousStep}
          disabled={previousDisabled}
        >
          Back
        </Button>
      )}
      <Box flex={1} />
      {onNextStep && (
        <Button
          variant="contained"
          onClick={onNextStep}
          disabled={nextDisabled}
        >
          Next
        </Button>
      )}
      {onFinish && (
        <Button
          variant="contained"
          onClick={onFinish}
          disabled={finishDisabled}
          loading={finishLoading}
        >
          Finish
        </Button>
      )}
    </Box>
  );
}
