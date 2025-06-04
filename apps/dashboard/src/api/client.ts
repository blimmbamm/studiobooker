const BASE_URL = 'http://localhost:3000/';

export class CustomError extends Error{  
  constructor(message: string, public status: number){
    super(message);
  }
}

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

  if(!response.ok) {
    const errorData = await response.json();
    const e = new CustomError(errorData.message, response.status);
    throw e; // how to type this?
  }
  
  const data = await response.json();
  
  await new Promise((resolve) => setTimeout(resolve, config.timeout || 0));
  
  return data;
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


