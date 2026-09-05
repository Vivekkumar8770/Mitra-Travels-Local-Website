export type LocalMediaAsset = {
  id: number;
  storageKey: string;
  filename: string;
  contentType: string;
  size: number;
  createdAt: string;
};

const assets: LocalMediaAsset[] = [];
const files = new Map<string, ArrayBuffer>();
let nextId = 1;

export function addLocalMedia(file: { name: string; type: string; size: number; data: ArrayBuffer }) {
  const now = new Date().toISOString();
  const storageKey = `local/${Date.now()}-${nextId}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`;
  const asset: LocalMediaAsset = { id: nextId++, storageKey, filename: file.name, contentType: file.type, size: file.size, createdAt: now };
  assets.unshift(asset);
  files.set(storageKey, file.data);
  return asset;
}

export function listLocalMedia() {
  return assets;
}

export function getLocalMedia(id: number) {
  const asset = assets.find((item) => item.id === id);
  return asset ? { asset, data: files.get(asset.storageKey) } : null;
}

export function deleteLocalMedia(id: number) {
  const index = assets.findIndex((item) => item.id === id);
  if (index < 0) return false;
  const [asset] = assets.splice(index, 1);
  files.delete(asset.storageKey);
  return true;
}
