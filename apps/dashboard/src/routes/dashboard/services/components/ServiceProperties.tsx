import { PropertiesTableSection, PropertySkeleton } from '@studiobooker/utils';
import { Service } from "../../../../types/service";

export function ServiceProperties({service}: {service?: Service}){
  return <PropertiesTableSection title='Details'>
    {!service && (
      <>
        <PropertySkeleton name="Title" />
        <PropertySkeleton name="Description" />
        <PropertySkeleton name="Duration" />
        <PropertySkeleton name="Price" />
        <PropertySkeleton name="Category" />
      </>
    )}
    {service && (
      <>
        <p>Whatever</p>
      </>
    )}
  </PropertiesTableSection>
}