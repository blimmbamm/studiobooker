import { PropertySkeleton, PropertiesTableSection } from '@studiobooker/utils';
import { ServiceStructured } from '../../../../../types/service';
import ServiceTitle from './ServiceTitle';
import ServiceDescription from './ServiceDescription';
import ServiceDuration from './ServiceDuration';
import ServicePrice from './ServicePrice';
import ServiceCategory from './ServiceCategory';

export function ServiceProperties({
  service,
}: {
  service?: ServiceStructured;
}) {
  return (
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
  );
}
