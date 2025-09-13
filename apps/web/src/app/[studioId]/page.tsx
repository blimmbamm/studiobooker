import StudioDetails from '../../components/StudioDetails';
import { getStudio } from '../../api/studio';

export default async function StudioPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const studio = await getStudio(studioId);

  return (
    <div>
      <p>Blabla, this is already visible on screen.</p>
      <StudioDetails studio={studio} />
    </div>
  );
}
