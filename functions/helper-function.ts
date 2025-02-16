export function convertStringToCamelCase(word: string): string {
  return word
    .toLowerCase()
    .split(' ')
    .map((w, index) => (index === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('')
}
