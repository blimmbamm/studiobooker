export function toSearchParams(params?: Record<string, any>): URLSearchParams {
  if (!params) return new URLSearchParams();

  const stringParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      stringParams[key] = String(value);
    }
  });

  return new URLSearchParams(stringParams);
}
