import {
  ButtonWithConfirmDialog,
  ButtonWithConfirmDialogProps,
} from './ButtonWithConfirmDialog';

type Props = Pick<
  ButtonWithConfirmDialogProps,
  'onConfirm' | 'dialogTitle' | 'dialogMessage'
>;

export function RemoveButton({ onConfirm, dialogTitle, dialogMessage }: Props) {
  return (
    <ButtonWithConfirmDialog
      onConfirm={onConfirm}
      buttonLabel="Remove"
      buttonProps={{
        color: 'error',
        sx: { backgroundColor: (theme) => theme.palette.error.light },
      }}
      dialogTitle={dialogTitle}
      dialogMessage={dialogMessage}
    />
  );
}
