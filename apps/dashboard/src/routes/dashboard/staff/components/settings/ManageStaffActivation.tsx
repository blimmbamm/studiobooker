import { SettingsItem } from '@studiobooker/utils';

export default function ManageStaffActivation() {
  return (
    <SettingsItem
      title="Deactivate staff"
      description="Staff is deactivated and cannot be booked by customers. Blabla what if this text gets super long and there must be a line break?"
      buttonLabel="Remove"
      onAction={() => {}}
    />
  );
}
