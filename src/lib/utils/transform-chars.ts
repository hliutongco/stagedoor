export function transformCharacters(
  input: string,
  expression = /[\/?&#%<>]/g,
  newChar = '_',
): string {
  return input.replace(expression, newChar);
}
