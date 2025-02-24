export function replaceValue<T>(obj: T, target: string, replacement: string): T {
  if (typeof obj === 'string') {
    return (obj.replace(new RegExp(`\\b${ target }\\b`, 'gi'), replacement) as unknown) as T;
  }
  if (Array.isArray(obj)) {
    return (obj.map(item => replaceValue(item, target, replacement)) as unknown) as T;
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([ key, value ]) => [ key, replaceValue(value, target, replacement) ]),
    ) as T;
  }
  return obj;
}
