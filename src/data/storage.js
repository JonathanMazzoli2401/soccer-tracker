const KEY = "soccer-tracker:favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function toggleFavorite(item) {
  const favs = getFavorites();
  const exists = favs.some((f) => f.type === item.type && String(f.id) === String(item.id));

  const updated = exists
    ? favs.filter((f) => !(f.type === item.type && String(f.id) === String(item.id)))
    : [...favs, item];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
