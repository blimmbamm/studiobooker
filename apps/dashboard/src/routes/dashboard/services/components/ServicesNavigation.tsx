import {
  SideNavSection,
  useNumericParam,
  NavigationList,
} from '@studiobooker/utils';
import { useServicesByCategory } from '../../../../hooks/service.queries';
import { useEffect, useState } from 'react';
import { ServiceCategoryStructured } from '../../../../types/service-category';
import { useNavigate } from 'react-router-dom';
import AddCategory from './navigation/AddCategory';
import AddService from './navigation/AddService';
import CategoryOptionsMenu from './navigation/CategoryOptionsMenu';

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

  useEffect(() => {
    if (serviceId) {
      /**
       * If there is a service id in the url, set selected category
       * to the category that contains the service. This is needed
       * to auto-select the proper category if page is loaded with
       * service detail, that is /dashboard/services/:id
       */
      setSelectedCategory(
        serviceCategories?.find((sc) =>
          sc.services.map((s) => s.id).includes(serviceId)
        )
      );
    } else {
      /**
       * If user is on just /dashboard/services, update selected category
       * if underlying data changes, for example, if a service is added
       * into the category.
       */
      setSelectedCategory((prevCategory) =>
        serviceCategories?.find((sc) => sc.id === prevCategory?.id)
      );
    }
  }, [serviceCategories, serviceId]);

  return (
    <>
      <SideNavSection title="Category" actionComponent={<AddCategory />}>
        <NavigationList
          isLoading={isLoading}
          isError={isError}
          errorMessage="Something went wrong. :("
          data={serviceCategories}
          labelProperty="name"
          isActive={(category) => category === selectedCategory}
          onClick={handleSwitchCategory}
          fallbackMessage="No categories yet."
          secondaryActionRender={(category, anchorEl, handleClose) => (
            <CategoryOptionsMenu
              category={category}
              anchorEl={anchorEl}
              handleClose={handleClose}
            />
          )}
        />
      </SideNavSection>
      <SideNavSection
        title="Service"
        marginLeft={'250px'}
        actionComponent={<AddService category={selectedCategory} />}
      >
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
