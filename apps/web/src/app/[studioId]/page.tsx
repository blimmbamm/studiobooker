import { getStudioPublic } from '@studiobooker/utils';
import StudioDetails from '../../components/StudioDetails';

export default async function StudioPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const studio = await getStudioPublic(studioId);

  return <StudioDetails studio={studio} />;
}
