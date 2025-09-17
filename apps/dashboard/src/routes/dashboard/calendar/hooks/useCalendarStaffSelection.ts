import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAlert, Staff } from '@studiobooker/utils';

import { useAllStaff } from '../../../../hooks/staff.queries';

export function useCalendarStaffSelection(maxSelectionSize: number = 10) {
  const [params, setParams] = useSearchParams();
  const { staff } = useAllStaff();

  const staffParams = params.get('staff');

  const alert = useAlert();

  // This list can include NaNs:
  const parsedStaffIds = staffParams ? staffParams.split(',').map(Number) : [];

  const staffIds = staffIsValid(parsedStaffIds, staff)
    ? parsedStaffIds.sort()
    : undefined;

  // Alternative: Pass list of ids right away and then check/update in background

  function staffIsValid(ids: number[], staff?: Staff[]) {
    if (staff) {
      return ids.every((id) => staff.map((s) => s.id).includes(id));
    } else {
      return false;
    }
  }

  function toggleStaff(id: number) {
    if (!staffIds?.includes(id) && staffIds?.length === maxSelectionSize) {
      alert.show({
        severity: 'info',
        message: `Cannot select more than ${maxSelectionSize} staff members.`,
      });
      return;
    }

    setParams((pParams) => {
      const pStaffParams = pParams.get('staff');

      let pStaffIdList = pStaffParams
        ? pStaffParams.split(',').map(Number)
        : [];

      const newParams = new URLSearchParams(pParams);

      // If staff param list is undefined or doesn't contain id, add it:
      if (!pStaffIdList.includes(id)) {
        const staffIdList = [...pStaffIdList, id];
        newParams.set('staff', staffIdList.toString());
      } else {
        const staffIdList = pStaffIdList.filter((value) => value !== id);
        newParams.set('staff', staffIdList.toString());
      }

      return newParams;
    });
  }

  function clearStaffParams() {
    setParams((pParams) => {
      const newParams = new URLSearchParams(pParams);
      newParams.delete('staff');
      return newParams;
    });
  }

  useEffect(() => {
    if (staff && !staffIsValid(parsedStaffIds, staff)) {
      clearStaffParams();
    }
  }, [parsedStaffIds, staff]);

  return {
    staffIds,
    toggleStaff,
  };
}
