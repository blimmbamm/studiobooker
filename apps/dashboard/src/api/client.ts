const BASE_URL = 'http://localhost:3000/';

async function _fetch<T>(config: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: any;
  timeout?: number;
}): Promise<T> {
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

  try {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message); // how to type this

    await new Promise((resolve) => setTimeout(resolve, config.timeout || 0));

    return data;
  } catch {
    throw new Error('Unknown error');
  }
}

export function get<T>(path: string) {
  return _fetch<T>({ path, method: 'GET' });
}

export function post<T>(path: string, body: any): Promise<T> {
  return _fetch<T>({ path, method: 'POST', body });
}
