import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  SideNavSection,
  useNumericParam,
  NavigationList,
  ServiceCategoryStructured,
} from '@studiobooker/utils';

import { useServicesByCategory } from '../../../../../hooks/service.queries';
import AddCategory from './AddCategory';
import CategoryOptionsMenu from './CategoryOptionsMenu';
import AddService from './AddService';

export default function ServicesNavigation() {
  const { serviceCategories, isLoading, isError } = useServicesByCategory();

  const [params, setParams] = useSearchParams();
  const categoryId = params.get('category');

  const selectedCategory = serviceCategories?.find(
    (c) => c.id.toString() == categoryId
  );

  const serviceId = useNumericParam('id');

  const navigate = useNavigate();

  function handleSelectCategory(category: ServiceCategoryStructured) {
    setParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('category', category.id.toString());
      return newParams;
    });
  }

  useEffect(() => {
    if (
      selectedCategory &&
      serviceId &&
      !selectedCategory?.services.find((s) => s.id === serviceId)
    ) {
      navigate({ pathname: '.', search: params.toString() });
    }
  }, [selectedCategory, serviceId]);

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
          onClick={handleSelectCategory}
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
          listItemTextProps={(service) => ({
            sx: {
              fontStyle: service.activated ? 'normal' : 'italic',
              opacity: service.activated ? 1 : 0.5,
            },
          })}
        />
      </SideNavSection>
    </>
  );
}
