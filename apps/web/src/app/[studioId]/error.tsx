'use client';

export type ErrorPageProps = {
  error: Error & { digest?: string };
};

export default function Error({ error }: ErrorPageProps) {
  return <p>Studio page level error: {error.message}</p>;
}
