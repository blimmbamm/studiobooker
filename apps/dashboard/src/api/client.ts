const BASE_URL = 'http://localhost:3000/';

async function _fetch<T>(config: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
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

// function get<T>(path: string) {
//   return _fetch<T>({ path, method: 'GET' });
// }

// function post<T>(path: string, body?: any): Promise<T> {
//   return _fetch<T>({ path, method: 'POST', body });
// }

// function patch<T>(path: string, body: any): Promise<T> {
//   return _fetch<T>({ path, method: 'PATCH', body });
// }

// function remove<T>(path: string, body: any): Promise<T> {
//   return _fetch<T>({ path, method: 'DELETE', body });
// }

export const client = {
  get: function <T>(path: string) {
    return _fetch<T>({ path, method: 'GET' });
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


