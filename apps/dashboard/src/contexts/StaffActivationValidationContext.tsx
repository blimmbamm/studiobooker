import { Staff } from '@studiobooker/utils';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type ErrorSource = 'working-times' | 'services';

type StaffActivationValidationContextType = {
  hasError: (source: ErrorSource) => boolean;
  errorMessage: (source: ErrorSource) => string | undefined;
  setError: (source: ErrorSource, message?: string) => void;
  resetError: (source: ErrorSource) => void;
};

const StaffActivationValidationContext = createContext<
  StaffActivationValidationContextType | undefined
>(undefined);

export default function StaffActivationValidationProvider({
  children,
  staff,
}: PropsWithChildren<{ staff?: Staff }>) {
  const initialErrorMap = new Map<ErrorSource, string>();
  const [errorMap, setErrorMap] = useState(initialErrorMap);

  function resetErrorMap() {
    setErrorMap(initialErrorMap);
  }

  function hasError(source: ErrorSource) {
    return !!errorMap.get(source);
  }

  function errorMessage(source: ErrorSource) {
    return errorMap.get(source);
  }

  function setError(source: ErrorSource, message?: string) {
    setErrorMap((prevMap) =>
      new Map(prevMap).set(source, message || 'Invalid value')
    );
  }

  function resetError(source: ErrorSource) {
    setErrorMap((prevMap) => {
      const map = new Map(prevMap);
      map.delete(source);
      return map;
    });
  }

  useEffect(() => {
    resetErrorMap();
  }, [staff?.id]);

  return (
    <StaffActivationValidationContext.Provider
      value={{
        hasError,
        errorMessage,
        setError,
        resetError,
      }}
    >
      {children}
    </StaffActivationValidationContext.Provider>
  );
}

export function useStaffActivationValidation() {
  const context = useContext(StaffActivationValidationContext);

  if (!context)
    throw new Error(
      'useServiceActivationValidation must be used within ServiceActivationValidationProvider'
    );

  return context;
}
