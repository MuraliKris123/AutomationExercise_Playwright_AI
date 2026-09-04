export function createUniqueEmail(prefix = 'test.user'): string {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}.${suffix}@example.com`;
}
