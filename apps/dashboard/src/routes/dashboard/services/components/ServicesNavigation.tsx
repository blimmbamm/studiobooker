import {
  SideNavSection,
  useNumericParam,
  NavigationList,
} from '@studiobooker/utils';
import { useServicesByCategory } from '../../../../hooks/service.queries';
import { useState } from 'react';
import { ServiceCategory } from '../../../../types/service-category';

export default function ServicesNavigation() {
  const { serviceCategories, isLoading, isError } = useServicesByCategory();

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>();

  const serviceId = useNumericParam('id');

  return (
    <>
      <SideNavSection title="Category">
        <NavigationList
          isLoading={isLoading}
          isError={isError}
          errorMessage="Something went wrong. :("
          data={serviceCategories}
          labelProperty="name"
          isActive={(category) => category === selectedCategory}
          onClick={(item) => setSelectedCategory(item)}
          fallbackMessage="No categories yet."
        />
      </SideNavSection>
      <SideNavSection title="Service" marginLeft={'250px'}>
        <NavigationList
          isLoading={isLoading}
          isError={isError}
          errorMessage="Something went wrong. :("
          data={selectedCategory?.services || []}
          labelProperty="title"
          navigateTo={(service) => service.id.toString()}
          isActive={(service) => service.id === serviceId}
          fallbackMessage={
            selectedCategory ? 'No services yet.' : 'Select category.'
          }
        />
      </SideNavSection>
    </>
  );
}
