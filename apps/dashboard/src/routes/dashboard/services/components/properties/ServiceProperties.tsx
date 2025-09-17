import { Box } from '@mui/material';

import {
  PropertySkeleton,
  PropertiesTableSection,
  ServiceStructured,
} from '@studiobooker/utils';

import ServiceTitle from './ServiceTitle';
import ServiceDescription from './ServiceDescription';
import ServiceDuration from './ServiceDuration';
import ServicePrice from './ServicePrice';
import ServiceCategory from './ServiceCategory';
import { useServiceActivationValidation } from '../../../../../contexts/ServiceActivationValidationContext';

export function ServiceProperties({
  service,
}: {
  service?: ServiceStructured;
}) {
  const { scrollTargetRef } = useServiceActivationValidation();

  return (
    <>
      <Box ref={scrollTargetRef} />
      <PropertiesTableSection title="Details">
        {!service && (
          <>
            <PropertySkeleton name="Title" />
            <PropertySkeleton name="Description" />
            <PropertySkeleton name="Duration" adornment="min." />
            <PropertySkeleton name="Price" />
            <PropertySkeleton name="Category" />
          </>
        )}
        {service && (
          <>
            <ServiceTitle service={service} />
            <ServiceDescription service={service} />
            <ServiceDuration service={service} />
            <ServicePrice service={service} />
            <ServiceCategory service={service} />
          </>
        )}
      </PropertiesTableSection>
    </>
  );
}
