const settings = new Map<string, string>();

export function getLocalSettings() {
  return Object.fromEntries(settings.entries());
}

export function saveLocalSettings(values: Record<string, string>) {
  for (const [key, value] of Object.entries(values)) settings.set(key, value);
}
