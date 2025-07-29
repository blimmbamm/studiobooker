import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Service } from '../types/service';

type ServiceActivationValidationContextType = {
  hasError: (key: keyof Service) => boolean;
  errorMessage: (key: keyof Service) => string | undefined;
  setError: (key: keyof Service, message?: string) => void;
  resetError: (key: keyof Service) => void;
  scrollTargetRef: React.RefObject<HTMLDivElement | null>;
};

const ServiceActivationValidationContext = createContext<
  ServiceActivationValidationContextType | undefined
>(undefined);

export default function ServiceActivationValidationProvider({
  children,
  service,
}: { service?: Service } & PropsWithChildren) {
  const initialErrorMap = new Map<keyof Service, string>();
  const [errorMap, setErrorMap] = useState(initialErrorMap);

  function resetErrorMap() {
    setErrorMap(initialErrorMap);
  }

  function hasError(key: keyof Service) {
    return !!errorMap.get(key);
  }

  function errorMessage(key: keyof Service) {
    return errorMap.get(key);
  }

  function setError(key: keyof Service, message?: string) {
    setErrorMap((prevMap) =>
      new Map(prevMap).set(key, message || 'Invalid value')
    );

    // scrollTargetRef.current?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });
  }

  function resetError(key: keyof Service) {
    setErrorMap((prevMap) => {
      const map = new Map(prevMap);
      map.delete(key);
      return map;
    });
  }

  const scrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetErrorMap();
  }, [service?.id]);

  return (
    <ServiceActivationValidationContext.Provider
      value={{
        hasError,
        errorMessage,
        setError,
        resetError,
        scrollTargetRef,
      }}
    >
      {children}
    </ServiceActivationValidationContext.Provider>
  );
}

export function useServiceActivationValidation() {
  const serviceActivationValidationContext = useContext(
    ServiceActivationValidationContext
  );

  if (!serviceActivationValidationContext)
    throw new Error(
      'useServiceActivationValidation must be used within ServiceActivationValidationProvider'
    );

  return serviceActivationValidationContext;
}
