/**
 * Checks if `value` is valid initial part of an email
 */
export function isValidPartialEmailOrEmpty(value: string) {
  const conditions = [
    /^[A-Za-z0-9][A-Za-z0-9._-]*$/, // local part
    /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?@([A-Za-z0-9-]+(?:\.[A-Za-z]*)?)?$/, // full part
  ];

  return (
    !value || (conditions.some((re) => re.test(value)) && !value.includes('..'))
  );
}

/**
 * Checks if value represents valid full email
 */
export function isValidFullEmailOrEmpty(value: string) {
  return !value || isValidFullEmail(value);
}

export function isValidFullEmail(value: string) {
  const validMailRegex =
    /^[A-Za-z0-9](?:[A-Za-z0-9._-]*[A-Za-z0-9])?@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  return validMailRegex.test(value);
}
