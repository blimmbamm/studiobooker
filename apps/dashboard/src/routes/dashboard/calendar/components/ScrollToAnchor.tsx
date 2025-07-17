import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

import { useScrollContainer } from '@studiobooker/utils';

export default function ScrollToAnchor() {
  const now = dayjs();

  const anchorRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useScrollContainer();

  /** Ok, just scroll into view once... */
  useEffect(() => {
    const anchor = anchorRef.current;
    const container = scrollContainerRef.current;

    if (anchor && container) {
      anchor.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });

      container.scrollTop -= 100;
    }
  }, []);

  return (
    <Box
      ref={anchorRef}
      position={'absolute'}
      top={(now.hour() - 1) * 60}
      width={'100px'}
      height={'60px'}
      visibility={'hidden'}
    />
  );
}
