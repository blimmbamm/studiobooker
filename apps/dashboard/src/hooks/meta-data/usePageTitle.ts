import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title; // remember old title
    document.title = `Studiobooker - ${title}`;

    return () => {
      document.title = previousTitle; // restore when unmounted
    };
  }, [title]);
}
