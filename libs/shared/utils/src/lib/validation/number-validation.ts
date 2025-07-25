export function isNumberString(value: string) {
  return /^[0-9]*$/.test(value);
}

export function isPositiveNumberString(value: string) {
  return /^[1-9][0-9]*$/.test(value);
}

export function isPositiveNumberStringOrEmpty(value: string) {
  return !value || isPositiveNumberString(value);
}
