'use client';

import { useParams } from 'react-router-dom';

export function useNumericParam(identifier: string) {
  const param = useParams()[identifier];
  return Boolean(Number(param)) ? Number(param) : undefined;
}
