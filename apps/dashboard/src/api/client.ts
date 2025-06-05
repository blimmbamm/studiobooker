import { QueryError, QueryErrorType } from '@studiobooker/utils';

const BASE_URL = 'http://localhost:3000/';

async function _fetch<T>(config: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  timeout?: number;
}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${config.path}`, {
      method: config.method,
      credentials: 'include',
      ...(config.body
        ? {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config.body),
          }
        : {}),
    });

    if (!response.ok) {
      // In general, shape {message: string, statusCode: number} comes from Nest
      const errorData = (await response.json()) as { message?: string };

      const errorType =
        response.status === 404
          ? QueryErrorType.HTTP_NOT_FOUND
          : QueryErrorType.HTTP_OTHER;

      throw new QueryError(
        errorData.message || 'Unknown error',
        errorType,
        response.status
      );
    }

    const data = await response.json();

    await new Promise((resolve) => setTimeout(resolve, config.timeout || 0));

    return data;
  } catch (error) {
    if (error instanceof QueryError) throw error;

    throw new QueryError((error as Error).message, QueryErrorType.OTHER, -1);
  }
}

export const client = {
  get: function <T>(path: string, timeout?: number) {
    return _fetch<T>({ path, method: 'GET', timeout });
  },
  post: function <T>(path: string, body?: any): Promise<T> {
    return _fetch<T>({ path, method: 'POST', body });
  },
  patch: function <T>(path: string, body: any): Promise<T> {
    return _fetch<T>({ path, method: 'PATCH', body });
  },
  delete: function <T>(path: string, body: any): Promise<T> {
    return _fetch<T>({ path, method: 'DELETE', body });
  },
};
