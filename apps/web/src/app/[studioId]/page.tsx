import { getStudioPublic, initClient } from '@studiobooker/utils';
import StudioDetails from '../../components/StudioDetails';

initClient(process.env.BACKEND_URL || 'http://localhost:3001/');

export default async function StudioPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const studio = await getStudioPublic(studioId);

  return <StudioDetails studio={studio} />;
}
