import { getStudioPublic, initClient } from '@studiobooker/utils';
import StudioDetails from '../../components/StudioDetails';
import { cache } from 'react';

initClient(process.env.BACKEND_URL || 'http://localhost:3001/');

const getStudioPublicCached = cache((studioId: string) => {
  try {
    return getStudioPublic(studioId);
  } catch (error) {
    console.error(error);
    throw error
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const studio = await getStudioPublicCached(studioId);

  return {
    title: `${studio.name}`,
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const studio = await getStudioPublicCached(studioId);

  return <StudioDetails studio={studio} />;
}
