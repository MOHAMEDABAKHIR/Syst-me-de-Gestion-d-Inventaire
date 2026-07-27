/**
 * Django/DRF renvoie du snake_case (internal_code, created_at, ...).
 * Le frontend travaille en camelCase (internalCode, createdAt, ...).
 * Ces helpers convertissent automatiquement dans les deux sens,
 * récursivement, pour objets et tableaux.
 */

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  !(value instanceof File) &&
  !(value instanceof Date)

const snakeToCamel = (key: string): string =>
  key.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase())

const camelToSnake = (key: string): string =>
  key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

export function toCamelCase<T = unknown>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => toCamelCase(item)) as unknown as T
  }
  if (isPlainObject(input)) {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(input)) {
      result[snakeToCamel(key)] = toCamelCase(value)
    }
    return result as T
  }
  return input as T
}

export function toSnakeCase<T = unknown>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => toSnakeCase(item)) as unknown as T
  }
  if (isPlainObject(input)) {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(input)) {
      result[camelToSnake(key)] = toSnakeCase(value)
    }
    return result as T
  }
  return input as T
}
