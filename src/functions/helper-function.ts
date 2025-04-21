export function convertStringToCamelCase(word: string): string {
  return word
    .toLowerCase()
    .split(' ')
    .map((w, index) =>
      index === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join('')
}

export function convertSnakeCaseToCamelCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .split(/[_\s]+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

export function convertCamelCaseToSnakeCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // adds _ between camelCase transitions
    .toLowerCase();
}

export function convertObjectToCamelCase<T extends Record<string, unknown>>(
  object: T
): Record<string, unknown> {
  return Object.keys(object).reduce((acc: Record<string, unknown>, key: string) => {
    const camelKey = convertCamelCaseToSnakeCase(key)
    acc[camelKey] = object[key]
    return acc
  }, {})
}
