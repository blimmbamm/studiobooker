import {
  SideNavSection,
  useNumericParam,
  NavigationList,
} from '@studiobooker/utils';
import { useServicesByCategory } from '../../../../hooks/service.queries';
import { useEffect, useState } from 'react';
import { ServiceCategoryStructured } from '../../../../types/service-category';
import { useNavigate } from 'react-router-dom';

export default function ServicesNavigation() {
  const { serviceCategories, isLoading, isError } = useServicesByCategory();

  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategoryStructured>();

  const serviceId = useNumericParam('id');

  const navigate = useNavigate();

  function handleSwitchCategory(category: ServiceCategoryStructured) {
    setSelectedCategory(category);

    /**
     * if there is a service id via route params, and if this id does not belong
     * to the selected category, navigate to just /dashboard/services
     */
    if (serviceId && !category?.services.find((s) => s.id === serviceId)) {
      navigate('/dashboard/services');
    }
  }

  /**
   * If there is a service id in the url, set selected category
   * to the category that contains the service
   */
  useEffect(() => {
    if (serviceId) {
      setSelectedCategory(
        serviceCategories?.find((sc) =>
          sc.services.map((s) => s.id).includes(serviceId)
        )
      );
    }
  }, [serviceCategories, serviceId]);

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
          onClick={handleSwitchCategory}
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
