import { notFound } from 'next/navigation';
import { getClient } from '../../http';
import {
  ApiStudioInformation,
  mapApiToStudioInformation,
  QueryError,
} from '../../types';

export async function getStudioPublic(studioId: string) {
  try {
    const data = await getClient().get<ApiStudioInformation>(
      `public/studio/${studioId}`,
      200
    );

    return mapApiToStudioInformation(data);
  } catch (error) {
    if (error instanceof QueryError && error.status === 404) {
      notFound();
    } else {
      throw error;
    }
  }
}
