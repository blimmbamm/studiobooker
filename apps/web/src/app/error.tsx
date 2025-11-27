'use client';

import { CenteredMessage } from '@studiobooker/utils';

export type ErrorPageProps = {
  error: Error & { digest?: string };
};

export default function Error({ error }: ErrorPageProps) {
  return (
    <CenteredMessage
      message="Something went wrong. :("
      // description={error.message}
    />
  );
}
