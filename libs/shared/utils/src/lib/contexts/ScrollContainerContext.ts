'use client';

import { createContext, useContext, RefObject } from 'react';

export const ScrollContainerContext =
  createContext<RefObject<HTMLElement | null> | null>(null);

export const useScrollContainer = () => {
  const ref = useContext(ScrollContainerContext);
  if (!ref)
    throw new Error(
      'useScrollContainer must be used within ScrollContainerContext.Provider'
    );
  return ref;
};
