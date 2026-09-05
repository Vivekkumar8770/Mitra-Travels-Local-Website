import type { TourPackage } from "@/lib/content";

const packages = new Map<string, TourPackage>();

export function listLocalPackages() {
  return Array.from(packages.values());
}

export function saveLocalPackage(item: TourPackage) {
  const existing = packages.get(item.slug);
  const saved = { ...existing, ...item, id: existing?.id || Date.now() };
  packages.set(item.slug, saved);
  return saved;
}
